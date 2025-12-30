<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1500" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"  @valuesChange="handleFormChange" />
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="销售订单_明细" key="salOrderDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salOrderDetail"
          :loading="salOrderDetailTable.loading"
          :columns="salOrderDetailTable.columns"
          :dataSource="salOrderDetailTable.dataSource"
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
    import {ref, computed, unref,reactive} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import { JVxeTable } from '/@/components/jeecg/JVxeTable'
    import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts'
    import {formSchema,salOrderDetailColumns} from '../SalOrder.data';
    import {saveOrUpdate, salOrderDetailList, salOrderDetailListByIds} from '../SalOrder.api';
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const isUpdateLock = ref(false);
    const formDisabled = ref(false);
    const refKeys = ref(['salOrderDetail', ]);
    const activeKey = ref('salOrderDetail');
    const salOrderDetail = ref();
    const tableRefs = {salOrderDetail, };
    const salOrderDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salOrderDetailColumns
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
        isUpdateLock.value = true;   // 🔒 上锁
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
             requestSubTableData(salOrderDetailList, {id:data?.record?.id}, salOrderDetailTable)
        }
        // 隐藏底部时禁用整个表单
       setProps({ disabled: !data?.showFooter })
        // ⚠️ 注意：解锁要延后
        isUpdateLock.value = false; // 🔓 解锁

    });
    //方法配置
    const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys);

    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

    async function reset(){
      await resetFields();
      activeKey.value = 'salOrderDetail';
      salOrderDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           salOrderDetailList: allValues.tablesValue[0].tableData,
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
      // 编辑态初始化阶段，直接忽略 isTax 的联动
      if (changedValues.isTax !== undefined && !isUpdateLock.value) {
        console.log('changed:', changedValues);
        setFieldsValue({
          salQuoteDocCodes: undefined,
          salQuoteIds: undefined,
          salQuoteDetailIds: undefined,
        });
        salOrderDetailTable.dataSource = [];
      }

      if (changedValues.customerCode !== undefined && !isUpdateLock.value) {
        const customerCode = changedValues.customerCode;

        setProps({
          schemas: formSchema.map(schema => {
            if (schema.field === 'salQuoteDocCodes') {
              return {
                ...schema,
                componentProps: ({ formActionType }) => {
                  const { setFieldsValue } = formActionType;
                  return {
                    setFieldsValue,
                    code: 'report_sal_quote',
                    fieldConfig: [
                      { source: 'doc_code', target: 'salQuoteDocCodes' },
                      { source: 'id', target: 'salQuoteIds' },
                      { source: 'detail_id', target: 'salQuoteDetailIds' },
                    ],
                    multi: true,
                    param: {
                      customer_code: customerCode ? `'${customerCode}'` : "''"
                    }
                  };
                }
              };
            }
            return schema;
          }),
        });

        // ⚠️ 关键：切换客户时，清空已选报价
        setFieldsValue({
          salQuoteDocCodes: undefined,
          salQuoteIds: undefined,
          salQuoteDetailIds: undefined,
        });
        salOrderDetailTable.dataSource = [];
      }

      if (
        ('salQuoteDetailIds' in changedValues || 'isTax' in changedValues) &&
        !isUpdateLock.value
      ) {
        const { isTax, salQuoteDetailIds } = getFieldsValue() || {};

        // 前提：必须已经选择了报价明细
        if (!salQuoteDetailIds) return;

        requestSubTableData(
          salOrderDetailListByIds,
          { id: `${salQuoteDetailIds}#${isTax}` },
          salOrderDetailTable
        );
      }




    }


    function handleValueChange({ row, column, value }) {

      // 金额联动
      if (column.key === 'qty' || column.key === 'unitPrice' ||  column.key === 'discountRate'  ||  column.key === 'taxUnitPrice') {

        const discountRate = Number(row.discountRate);
        const rate = Number.isFinite(discountRate) && discountRate > 0 ? discountRate : 1;

        const qty = Number(row.qty) || 0;
        const unitPrice = Number(row.unitPrice) || 0;
        const taxUnitPrice = Number(row.taxUnitPrice) || 0;

        row.amount = round(rate * qty * unitPrice, 2);
        row.taxAmount = round(rate * qty * taxUnitPrice, 2);


      }

    }
    function round(num, scale = 2) {
      const factor = Math.pow(10, scale);
      return Math.round((Number(num) || 0) * factor) / factor;
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
