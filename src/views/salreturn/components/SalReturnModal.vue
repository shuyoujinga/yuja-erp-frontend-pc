<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1500" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="销售退货_明细" key="salReturnDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="salReturnDetail"
          :loading="salReturnDetailTable.loading"
          :columns="salReturnDetailTable.columns"
          :dataSource="salReturnDetailTable.dataSource"
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
    import {formSchema,salReturnDetailColumns} from '../SalReturn.data';
    import {saveOrUpdate,salReturnDetailList} from '../SalReturn.api';
    import {getMaterialByCodeApi} from "@/views/bom/YujiakejiBom.api";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['salReturnDetail', ]);
    const activeKey = ref('salReturnDetail');
    const salReturnDetail = ref();
    const tableRefs = {salReturnDetail, };
    const salReturnDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salReturnDetailColumns
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
             requestSubTableData(salReturnDetailList, {id:data?.record?.id}, salReturnDetailTable)
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
      activeKey.value = 'salReturnDetail';
      salReturnDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           salReturnDetailList: allValues.tablesValue[0].tableData,
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
            row.unit = material.unit;
          } else {
            row.specifications = '';
            row.code = '';
            row.unit = '';
            row.unit_price = 0;
          }
        });
        console.log(row)
      }
      // 数量变化 → 金额 = 数量 × 单价
      if (column.key === 'qty') {
        const qty = Number(value) || 0;
        const unitPrice = Number(row.unitPrice) || 0;

        const amount = qty * unitPrice;
        row.amount = Math.round(amount * 100) / 100;
        return;
      }

      // 单价变化 → 金额 = 数量 × 单价
      if (column.key === 'unitPrice') {
        const qty = Number(row.qty) || 0;
        const unitPrice = Number(value) || 0;

        const amount = qty * unitPrice;
        row.amount = Math.round(amount * 100) / 100;
        return;
      }

      // 金额变化 → 单价 = 金额 ÷ 数量
      if (column.key === 'amount') {
        const amount = Number(value) || 0;
        const qty = Number(row.qty) || 0;

        if (qty !== 0) {
          const unitPrice = amount / qty;
          row.unitPrice = Math.round(unitPrice * 100) / 100;
        } else {
          row.unitPrice = 0;
        }
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
