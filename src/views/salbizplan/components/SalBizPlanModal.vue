<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="2000"
              @ok="handleSubmit">
    <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange"/>
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="业务计划_明细" key="salBizPlanDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salBizPlanDetail"
          :loading="salBizPlanDetailTable.loading"
          :columns="salBizPlanDetailTable.columns"
          :dataSource="salBizPlanDetailTable.dataSource"
          :height="auto"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"
          @valueChange="handleValueChange"
        />
      </a-tab-pane>
      <a-tab-pane tab="业务计划_材料明细" key="salBizPlanBomDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salBizPlanBomDetail"
          :loading="salBizPlanBomDetailTable.loading"
          :columns="salBizPlanBomDetailTable.columns"
          :dataSource="salBizPlanBomDetailTable.dataSource"
          :height="auto"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"

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
import {formSchema, salBizPlanDetailColumns, salBizPlanBomDetailColumns} from '../SalBizPlan.data';
import {
  saveOrUpdate,
  salBizPlanDetailList,
  salBizPlanBomDetailList,
  salBizPlanDetailListByIds,
  salBizPlanBomDetailListByIds,
} from '../SalBizPlan.api';
import {getMaterialInfoAndBomList} from "@/api/common/api";
import {useMessage} from "@/hooks/web/useMessage";
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const formDisabled = ref(false);
const refKeys = ref(['salBizPlanDetail', 'salBizPlanBomDetail',]);
const activeKey = ref('salBizPlanDetail');
const salBizPlanDetail = ref();
const salBizPlanBomDetail = ref();
const tableRefs = {salBizPlanDetail, salBizPlanBomDetail,};
const salBizPlanDetailTable = reactive({
  loading: false,
  dataSource: [],
  columns: salBizPlanDetailColumns
})
const salBizPlanBomDetailTable = reactive({
  loading: false,
  dataSource: [],
  columns: salBizPlanBomDetailColumns
})
//表单配置
const [registerForm, {setProps, resetFields, setFieldsValue, validate}] = useForm({
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
    requestSubTableData(salBizPlanDetailList, {id: data?.record?.id}, salBizPlanDetailTable)
    requestSubTableData(salBizPlanBomDetailList, {id: data?.record?.id}, salBizPlanBomDetailTable)
  }
  // 隐藏底部时禁用整个表单
  setProps({disabled: !data?.showFooter})
});
//方法配置
const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(requestAddOrEdit, classifyIntoFormData, tableRefs, activeKey, refKeys);

//设置标题
const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
const {createMessage}  = useMessage()
async function reset() {
  await resetFields();
  activeKey.value = 'salBizPlanDetail';
  salBizPlanDetailTable.dataSource = [];
  salBizPlanBomDetailTable.dataSource = [];
}

function classifyIntoFormData(allValues) {
  let main = Object.assign({}, allValues.formValue)
  return {
    ...main, // 展开
    salBizPlanDetailList: allValues.tablesValue[0].tableData,
    salBizPlanBomDetailList: allValues.tablesValue[1].tableData,
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

function handleFormChange(changedValues) {
  console.log(changedValues)
  // 编辑态初始化阶段，直接忽略 isTax 的联动
  if (changedValues.salOrderDetailIds !== undefined) {
    // 直接加载明细
    requestSubTableData(salBizPlanDetailListByIds, {id: `${changedValues.salOrderDetailIds}`}, salBizPlanDetailTable);
    // 加载BOM明细
    requestSubTableData(salBizPlanBomDetailListByIds, {id: `${changedValues.salOrderDetailIds}`}, salBizPlanBomDetailTable);

  }

  if (changedValues.bizPlanType !== undefined && changedValues.bizPlanType === '1') {
    salBizPlanDetailTable.columns[0].disabled = false
  } else {
    salBizPlanDetailTable.columns[0].disabled = true
  }
}

function handleValueChange({row, column, value}) {
  // 只在计划数量变化时处理
  if (column.key === 'qty') {

    const materialCode = row.materialCode
    const qty = Number(value) || 0

    const dataSource = salBizPlanBomDetailTable.dataSource || []
    if (!materialCode || dataSource.length === 0) return

    dataSource.forEach(item => {
      if (item.productionMaterialCode === materialCode) {
        const standardQty = Number(item.standardQty) || 0
        item.requiredQty = round(qty * standardQty)
        // 同步 bomCode 到当前行
        row.bomCode = item.bomCode
      }
    })

    // 如果你的表格不是响应式的，必须强制触发更新
    salBizPlanBomDetailTable.dataSource = [...dataSource]
  }

    // 备货计划
    if (column.key === 'materialCode' && value) {

      getMaterialInfoAndBomList(value).then(res => {
        if (!res) return

        const material = res
        row.specifications = material.specifications
        row.unit = material.unit

        const bomInfoList = material.bomInfoList || []

        // ① 没有 BOM，直接拦截
        if (bomInfoList.length === 0) {
          createMessage.error(`物料${value}不存在BOM编码，请检查，否则无法提交数据!`)
          return
        }

        const dataSource = salBizPlanBomDetailTable.dataSource || []

        // ② 构建已有联合主键集合
        const existKeySet = new Set(
          dataSource.map(
            item => `${item.productionMaterialCode}__${item.materialCode}`
          )
        )

        // ③ 找出需要补充的 BOM 行（严格联合主键）
        const needAppendList = bomInfoList.filter(bom => {
          const key = `${value}__${bom.materialCode}`
          return !existKeySet.has(key)
        })

        // ④ 只追加缺失的，不覆盖已有的
        if (needAppendList.length > 0) {
          salBizPlanBomDetailTable.dataSource = [
            ...dataSource,
            ...needAppendList.map(bom => ({
              bomCode: bom.bomCode,
              productionMaterialCode: value,
              materialCode: bom.materialCode,
              unit: bom.unit,
              specifications: bom.specifications,
              standardQty: bom.standardQty,
            }))
          ]
        }
      })


    }

}

function round(num, scale = 2) {
  const factor = Math.pow(10, scale)
  return Math.round((Number(num) || 0) * factor) / factor
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
