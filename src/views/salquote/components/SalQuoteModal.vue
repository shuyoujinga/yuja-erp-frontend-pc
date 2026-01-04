<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1500" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"  />
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="销售报价_明细" key="salQuoteDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salQuoteDetail"
          :loading="salQuoteDetailTable.loading"
          :columns="salQuoteDetailTable.columns"
          :dataSource="salQuoteDetailTable.dataSource"
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
    import {formSchema,salQuoteDetailColumns} from '../SalQuote.data';
    import {saveOrUpdate,salQuoteDetailList} from '../SalQuote.api';
    import {getStockMaterial, getStockMaterialInSale} from "@/api/common/api";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['salQuoteDetail', ]);
    const activeKey = ref('salQuoteDetail');
    const salQuoteDetail = ref();
    const tableRefs = {salQuoteDetail, };
    const salQuoteDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salQuoteDetailColumns
    })
    //表单配置
    const [registerForm, {setProps,resetFields, setFieldsValue, validate}] = useForm({
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
             requestSubTableData(salQuoteDetailList, {id:data?.record?.id}, salQuoteDetailTable)
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
      activeKey.value = 'salQuoteDetail';
      salQuoteDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           salQuoteDetailList: allValues.tablesValue[0].tableData,
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

      // 只在“物料变化 + 仓库已选”的情况下查库存物料
      if (column.key === 'materialCode' && value  ) {
        getStockMaterialInSale(value).then((material) => {
          if (!material) {
            clearMaterialRow(row);
            return;
          }

          row.specifications = material.specifications;
          row.unit = material.unit;
          row.unitPrice = material.unitPrice;
          row.stockQty = material.stockQty || 0;
        });
      }

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

      function round(num, scale = 2) {
        const factor = Math.pow(10, scale);
        return Math.round((Number(num) || 0) * factor) / factor;
      }

    }

    function clearMaterialRow(row) {
      row.specifications = '';
      row.unit = '';
      row.unitPrice = 0;
      row.stockQty = 0;
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
