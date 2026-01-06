<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="2000"
              @ok="handleSubmit">
    <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange"/>
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="生产工序_明细" key="prdProcessDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="prdProcessDetail"
          :loading="prdProcessDetailTable.loading"
          :columns="prdProcessDetailTable.columns"
          :dataSource="prdProcessDetailTable.dataSource"
          :height="340"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"
          @valueChange="handleValueChange"
        />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
import {ref, computed, unref, reactive} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form/index';
import {JVxeTable} from '/@/components/jeecg/JVxeTable'
import {useJvxeMethod} from '/@/hooks/system/useJvxeMethods.ts'
import {formSchema, prdProcessDetailColumns} from '../PrdProcess.data';
import {saveOrUpdate, prdProcessDetailList} from '../PrdProcess.api';
import {VALIDATE_FAILED} from '/@/utils/common/vxeUtils'
import {getMaterialByCodeApi} from "@/views/bom/YujiakejiBom.api";
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const formDisabled = ref(false);
const refKeys = ref(['prdProcessDetail',]);
const activeKey = ref('prdProcessDetail');
const prdProcessDetail = ref();
const tableRefs = {prdProcessDetail,};
const prdProcessDetailTable = reactive({
  loading: false,
  dataSource: [],
  columns: prdProcessDetailColumns
})
//表单配置
const [registerForm, {setProps, resetFields, setFieldsValue, validate}] = useForm({
  //labelWidth: 150,
  schemas: formSchema,
  showActionButtonGroup: false,
  baseColProps: {span: 12}
});
//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  //重置表单
  await reset();
  setModalProps({
    confirmLoading: false,
    showCancelBtn: data?.showFooter,
    showOkBtn: data?.showFooter
  });
  isUpdate.value = !!data?.isUpdate;
  formDisabled.value = !data?.showFooter;
  if (unref(isUpdate)) {
    //表单赋值
    await setFieldsValue({
      ...data.record,
    });
    requestSubTableData(prdProcessDetailList, {id: data?.record?.id}, prdProcessDetailTable)
  }
  // 隐藏底部时禁用整个表单
  setProps({disabled: !data?.showFooter})
});
//方法配置
const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(requestAddOrEdit, classifyIntoFormData, tableRefs, activeKey, refKeys);

//设置标题
const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

async function reset() {
  await resetFields();
  activeKey.value = 'prdProcessDetail';
  prdProcessDetailTable.dataSource = [];
}

function classifyIntoFormData(allValues) {
  let main = Object.assign({}, allValues.formValue)
  return {
    ...main, // 展开
    prdProcessDetailList: allValues.tablesValue[0].tableData,
  }
}

//表单提交事件
async function requestAddOrEdit(values) {
  try {
    setModalProps({confirmLoading: true});
    //提交表单
    await saveOrUpdate(values, isUpdate.value);
    //关闭弹窗
    closeModal();
    //刷新列表
    emit('success');
  } finally {
    setModalProps({confirmLoading: false});
  }
}

// 监听 form valuesChange
function handleFormChange(changedValues) {
  if (changedValues.materialCode !== undefined) {
    getMaterialByCodeApi(changedValues.materialCode).then(res => {
      if (res) {
        setFieldsValue({
          unit: res.unit,
          specifications: res.specifications,
        })
      } else {
        setFieldsValue({
          unit: '',
          specifications: '',
        })

      }
    });
  }
}
function handleValueChange({ row, column, value }) {
  if (column.key === 'materialCode' && value) {
    getMaterialByCodeApi(value).then(res => {
      if (res) {
        const material = res;
        row.specifications = material.specifications;
        row.unit = material.unit;
        //row.unitPrice = material.unitPrice;
      } else {
        row.specifications = '';
        row.code = '';
        row.unit = '';
        row.unit_price = 0;
      }
    });

  }

}
</script>

<style lang="less" scoped>
/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
  width: 100%
}

:deep(.ant-calendar-picker) {
  width: 100%
}
</style>
