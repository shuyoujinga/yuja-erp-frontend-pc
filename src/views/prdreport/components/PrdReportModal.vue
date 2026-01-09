<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"  @valuesChange="handleFormChange" />
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="生产报工_明细" key="prdReportDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="prdReportDetail"
          :loading="prdReportDetailTable.loading"
          :columns="prdReportDetailTable.columns"
          :dataSource="prdReportDetailTable.dataSource"
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
    import {formSchema,prdReportDetailColumns} from '../PrdReport.data';
    import {saveOrUpdate, prdReportDetailList, prdReportDetailListByIds} from '../PrdReport.api';
    import {useMessage} from "@/hooks/web/useMessage";
    import {getStockMaterial} from "@/api/common/api";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['prdReportDetail', ]);
    const activeKey = ref('prdReportDetail');
    const prdReportDetail = ref();
    const tableRefs = {prdReportDetail, };
    const prdReportDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:prdReportDetailColumns
    })
    const { createMessage } = useMessage()
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
             requestSubTableData(prdReportDetailList, {id:data?.record?.id}, prdReportDetailTable)
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
      activeKey.value = 'prdReportDetail';
      prdReportDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           prdReportDetailList: allValues.tablesValue[0].tableData,
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
      // 只监听 workOrderDetailIds
      if (changedValues.workOrderIds !== undefined) {
        requestSubTableData(
          prdReportDetailListByIds,
          { id: changedValues.workOrderIds },
          prdReportDetailTable
        )
      }
      if (changedValues.qty !== undefined) {
        const qty = Number(changedValues.qty) || 0;
        const orderQty = Number(getFieldsValue().orderQty) || 0;

        // ① 先做业务红线校验
        if (qty > orderQty) {
          createMessage.error('完工数不可超过工单数量,请重新填写!');

          // 强制回滚输入框
          setFieldsValue({ qty: null });

          // 金额也要清零，避免脏数据残留
          prdReportDetailTable.dataSource = prdReportDetailTable.dataSource.map(row => ({
            ...row,
            amount: 0
          }));
          return;
        }

        // ② 合法才参与计算

        prdReportDetailTable.dataSource = prdReportDetailTable.dataSource.map(row => {
          const score = Number(row.score) || 0;
          const avgUnitPrice = Number(row.avgUnitPrice) || 0;
          const amount = Math.round(qty * (score/10) * avgUnitPrice * 100) / 100;

          return {
            ...row,
            amount
          };
        });
      }



    }

    function handleValueChange({ row, column, value }) {
      // 主表取值（一次取全量，不要频繁调用）
      const { qty } = getFieldsValue() || {};

      // 只在“物料变化 + 仓库已选”的情况下查库存物料
      if (column.key === 'score' && value && qty) {

        row.amount=Math.round((value/10)*qty* row.avgUnitPrice * 100) / 100
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
