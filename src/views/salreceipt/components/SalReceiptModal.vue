<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1500" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange" />
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="销售收款_明细" key="salReceiptDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salReceiptDetail"
          :loading="salReceiptDetailTable.loading"
          :columns="salReceiptDetailTable.columns"
          :dataSource="salReceiptDetailTable.dataSource"
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
    import {ref, computed, unref,reactive} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import { JVxeTable } from '/@/components/jeecg/JVxeTable'
    import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts'
    import {formSchema,salReceiptDetailColumns} from '../SalReceipt.data';
    import {saveOrUpdate, salReceiptDetailList, salReceiptDetailListByIds} from '../SalReceipt.api';

    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['salReceiptDetail', ]);
    const activeKey = ref('salReceiptDetail');
    const salReceiptDetail = ref();
    const tableRefs = {salReceiptDetail, };
    const salReceiptDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salReceiptDetailColumns
    })
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue,getFieldsValue, validate}] = useForm({
        //labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: {span: 12}
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
             requestSubTableData(salReceiptDetailList, {id:data?.record?.id}, salReceiptDetailTable)
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
      activeKey.value = 'salReceiptDetail';
      salReceiptDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           salReceiptDetailList: allValues.tablesValue[0].tableData,
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

      if (changedValues.settleDetailIds !== undefined) {
        const { settleAmountDetail } = changedValues;
        requestSubTableData(
          salReceiptDetailListByIds,
          { id: `${changedValues.settleDetailIds}` },
          salReceiptDetailTable
        );

        if (settleAmountDetail) {
          const deliveryAmount = settleAmountDetail
            .split(',')
            .map(v => Number(v))
            .filter(v => !Number.isNaN(v))
            .reduce((sum, v) => sum + v, 0);

          // 保留 2 位精度，且仍然是 Number
          const finalAmount = Math.round(deliveryAmount * 100) / 100;
          const { prepayAmount = 0 } = getFieldsValue();
          // 赋值（根据你实际表单 API 调整）
          setFieldsValue({
            amount:round(finalAmount-prepayAmount),
            settleAmount: finalAmount
          });
        }}

      if (changedValues.prepayIds !== undefined) {
        const { prepayAmountDetail } = changedValues;

        if (prepayAmountDetail) {
          const prepayAmount = prepayAmountDetail
            .split(',')
            .map(v => Number(v))
            .filter(v => !Number.isNaN(v))
            .reduce((sum, v) => sum + v, 0);
          const { settleAmount = 0 } = getFieldsValue();
          // 保留 2 位精度，且仍然是 Number
          const finalAmount = Math.round(prepayAmount * 100) / 100;

          // 赋值（根据你实际表单 API 调整）
          setFieldsValue({
            amount:round(settleAmount-finalAmount),
            prepayAmount: finalAmount
          });
        }
      }
    }
    function round(num, scale = 2) {
      const factor = Math.pow(10, scale)
      return Math.round((Number(num) || 0) * factor) / factor
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
