<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
      <BasicForm @register="registerForm" @valuesChange="handleFormChange" ref="formRef"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="库存盘点_明细" key="invStockTakeDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="invStockTakeDetail"
          :loading="invStockTakeDetailTable.loading"
          :columns="invStockTakeDetailTable.columns"
          :dataSource="invStockTakeDetailTable.dataSource"
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
    import {formSchema,invStockTakeDetailColumns} from '../InvStockTake.data';
    import {
      saveOrUpdate,
      invStockTakeDetailList,
      invStockTakeDetailListByLocation
    } from '../InvStockTake.api';

    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const isFormInitializing = ref(false);
    const formDisabled = ref(false);
    const refKeys = ref(['invStockTakeDetail', ]);
    const activeKey = ref('invStockTakeDetail');
    const invStockTakeDetail = ref();
    const tableRefs = {invStockTakeDetail, };
    const invStockTakeDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:invStockTakeDetailColumns
    })
    //表单配置
    const [registerForm, {setProps,resetFields,getFieldsValue, setFieldsValue, validate}] = useForm({
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
          isFormInitializing.value = true;
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
             requestSubTableData(invStockTakeDetailList, {id:data?.record?.id}, invStockTakeDetailTable)
          isFormInitializing.value = false;
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
      activeKey.value = 'invStockTakeDetail';
      invStockTakeDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           invStockTakeDetailList: allValues.tablesValue[0].tableData,
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
    function handleValueChange({ row, column }) {

      // 金额联动
      if (column.key === 'qty' ) {
        row.diffQty = (Number(row.qty) || 0) - (Number(row.bookQty) || 0);
        row.takeType = row.diffQty > 0
          ? 1
          : (row.diffQty < 0 ? -1 : 0);

      }
    }





    function handleFormChange(changedValues) {
      // 初始化加载阶段，任何联动都不触发
      if (isFormInitializing.value) {
        return;
      }
      if (changedValues.warehouseCode !== undefined||changedValues.areaCode !== undefined) {
        const { warehouseCode,areaCode } = getFieldsValue() || {};
        if(warehouseCode&&areaCode){
          requestSubTableData(invStockTakeDetailListByLocation, {id:warehouseCode+"_"+areaCode}, invStockTakeDetailTable)
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
