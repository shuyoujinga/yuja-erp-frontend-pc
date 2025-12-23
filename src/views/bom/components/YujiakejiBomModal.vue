<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="材料清单_明细表" key="yujiakejiBomDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="yujiakejiBomDetail"
          :loading="yujiakejiBomDetailTable.loading"
          :columns="yujiakejiBomDetailTable.columns"
          :dataSource="yujiakejiBomDetailTable.dataSource"
          :height="800"
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
    import {ref, computed, unref,reactive} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import { JVxeTable } from '/@/components/jeecg/JVxeTable'
    import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts'
    import {formSchema,yujiakejiBomDetailColumns} from '../YujiakejiBom.data';
    import {saveOrUpdate,yujiakejiBomDetailList,getMaterialByCodeApi} from '../YujiakejiBom.api';
    import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils'
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['yujiakejiBomDetail', ]);
    const activeKey = ref('yujiakejiBomDetail');
    const yujiakejiBomDetail = ref();
    const tableRefs = {yujiakejiBomDetail, };
    const yujiakejiBomDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:yujiakejiBomDetailColumns
    })
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
        labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: {span: 24}
    });
     //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        //重置表单
        await reset();
        setModalProps({confirmLoading: false,showCancelBtn:data?.showFooter,showOkBtn:data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        formDisabled.value = !data?.showFooter;
        if (unref(isUpdate)) {
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
             requestSubTableData(yujiakejiBomDetailList, {id:data?.record?.id}, yujiakejiBomDetailTable)
        }
        // 隐藏底部时禁用整个表单
       setProps({ disabled: !data?.showFooter })
    });
    //方法配置
    const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys);


    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

    async function reset(){
      await resetFields();
      activeKey.value = 'yujiakejiBomDetail';
      yujiakejiBomDetailTable.dataSource = [];
    }

    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           yujiakejiBomDetailList: allValues.tablesValue[0].tableData,
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



    function handleValueChange({ row, column, value }) {
      if (column.key === 'materialCode' && value) {
        getMaterialByCodeApi(value).then(res => {
          if (res) {
            const material = res;
            row.specifications = material.specifications;
            row.code = material.code;
            row.unit = material.unit;
            row.unitPrice = material.unitPrice;
          } else {
            row.specifications = '';
            row.code = '';
            row.unit = '';
            row.unit_price = 0;
          }
        });
        console.log(row)
      }
    }
</script>

<style lang="less" scoped>
	/** 时间和数字输入框样式 */
    :deep(.ant-input-number){
		width: 100%
	}

	:deep(.ant-calendar-picker){
		width: 100%
	}
</style>
