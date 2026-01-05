<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="2000" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange" />
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="销售结算_明细" key="salSettleDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salSettleDetail"
          :loading="salSettleDetailTable.loading"
          :columns="salSettleDetailTable.columns"
          :dataSource="salSettleDetailTable.dataSource"
          :height="auto"
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
    import {formSchema,salSettleDetailColumns} from '../SalSettle.data';
    import {saveOrUpdate,salSettleDetailList,salSettleDetailListByIds} from '../SalSettle.api';
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['salSettleDetail', ]);
    const activeKey = ref('salSettleDetail');
    const salSettleDetail = ref();
    const tableRefs = {salSettleDetail, };
    const salSettleDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salSettleDetailColumns
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
             requestSubTableData(salSettleDetailList, {id:data?.record?.id}, salSettleDetailTable)
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
      activeKey.value = 'salSettleDetail';
      salSettleDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           salSettleDetailList: allValues.tablesValue[0].tableData,
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

      if (changedValues.deliveryDetailIds !== undefined) {
        const { deliveryAmountDetail } = changedValues;
        requestSubTableData(
          salSettleDetailListByIds,
          { id: `${changedValues.deliveryDetailIds}` },
          salSettleDetailTable
        );

        if (deliveryAmountDetail) {
          const deliveryAmount = deliveryAmountDetail
            .split(',')
            .map(v => Number(v))
            .filter(v => !Number.isNaN(v))
            .reduce((sum, v) => sum + v, 0);

          // 保留 2 位精度，且仍然是 Number
          const finalAmount = Math.round(deliveryAmount * 100) / 100;
          const { returnAmount = 0 } = getFieldsValue();
          // 赋值（根据你实际表单 API 调整）
          setFieldsValue({
            amount:round(finalAmount-returnAmount),
            deliveryAmount: finalAmount
          });
      }}

      if (changedValues.returnDetailIds !== undefined) {
        const { returnAmountDetail } = changedValues;

        if (returnAmountDetail) {
          const returnAmount = returnAmountDetail
            .split(',')
            .map(v => Number(v))
            .filter(v => !Number.isNaN(v))
            .reduce((sum, v) => sum + v, 0);
          const { deliveryAmount = 0 } = getFieldsValue();
          // 保留 2 位精度，且仍然是 Number
          const finalAmount = Math.round(returnAmount * 100) / 100;

          // 赋值（根据你实际表单 API 调整）
          setFieldsValue({
            amount:round(deliveryAmount-finalAmount),
            returnAmount: finalAmount
          });
        }
      }
    }
    function handleValueChange({ row, column }) {
      if (column.key === 'qty') {
      console.log(salSettleDetailTable.dataSource)
        console.log(row)
        const deliveryAmount = salSettleDetailTable.dataSource
          .map(item => {
            // 如果是当前编辑行，用最新 qty 重新算 amount
            if (item.deliveryDetailId === row.deliveryDetailId) {
              const qty = Number(row.qty);
              const price = Number(row.unitPrice);
              return (!Number.isNaN(qty) && !Number.isNaN(price))
                ? qty * price
                : 0;
            }

            // 其他行用原 amount
            return Number(item.amount) || 0;
          })
          .reduce((sum, v) => sum + v, 0);

        const { returnAmount = 0 } = getFieldsValue();

        const finalAmount = Math.round(
          (deliveryAmount - Number(returnAmount || 0)) * 100
        ) / 100;

        setFieldsValue({
          deliveryAmount:round(deliveryAmount),
          amount: finalAmount
        });
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
