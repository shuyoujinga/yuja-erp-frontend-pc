<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="896" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"/>
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
          :height="340"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"
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
          :height="340"
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
    import {formSchema,salBizPlanDetailColumns,salBizPlanBomDetailColumns} from '../SalBizPlan.data';
    import {saveOrUpdate,salBizPlanDetailList,salBizPlanBomDetailList} from '../SalBizPlan.api';
    import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils'
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['salBizPlanDetail', 'salBizPlanBomDetail', ]);
    const activeKey = ref('salBizPlanDetail');
    const salBizPlanDetail = ref();
    const salBizPlanBomDetail = ref();
    const tableRefs = {salBizPlanDetail, salBizPlanBomDetail, };
    const salBizPlanDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salBizPlanDetailColumns
    })
    const salBizPlanBomDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:salBizPlanBomDetailColumns
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
             requestSubTableData(salBizPlanDetailList, {id:data?.record?.id}, salBizPlanDetailTable)
             requestSubTableData(salBizPlanBomDetailList, {id:data?.record?.id}, salBizPlanBomDetailTable)
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