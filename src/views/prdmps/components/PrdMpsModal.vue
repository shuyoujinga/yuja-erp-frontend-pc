<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="2000" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="生产计划_明细" key="prdMpsDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="prdMpsDetail"
          :loading="prdMpsDetailTable.loading"
          :columns="prdMpsDetailTable.columns"
          :dataSource="prdMpsDetailTable.dataSource"
          :height="auto"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          @valueChange="handleValueChange"
          />
      </a-tab-pane>
      <a-tab-pane tab="生产计划_材料清单" key="prdMpsBomDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="prdMpsBomDetail"
          :loading="prdMpsBomDetailTable.loading"
          :columns="prdMpsBomDetailTable.columns"
          :dataSource="prdMpsBomDetailTable.dataSource"
          :height="auto"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
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
    import {formSchema,prdMpsDetailColumns,prdMpsBomDetailColumns} from '../PrdMps.data';
    import {
      saveOrUpdate,
      prdMpsDetailList,
      prdMpsBomDetailList,
      prdMpsBomDetailListByIds, prdMpsDetailListByIds
    } from '../PrdMps.api';

    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['prdMpsDetail', 'prdMpsBomDetail', ]);
    const activeKey = ref('prdMpsDetail');
    const prdMpsDetail = ref();
    const prdMpsBomDetail = ref();
    const tableRefs = {prdMpsDetail, prdMpsBomDetail, };
    const prdMpsDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:prdMpsDetailColumns
    })
    const prdMpsBomDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:prdMpsBomDetailColumns
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
             requestSubTableData(prdMpsDetailList, {id:data?.record?.id}, prdMpsDetailTable)
             requestSubTableData(prdMpsBomDetailList, {id:data?.record?.id}, prdMpsBomDetailTable)
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
      activeKey.value = 'prdMpsDetail';
      prdMpsDetailTable.dataSource = [];
      prdMpsBomDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           prdMpsDetailList: allValues.tablesValue[0].tableData,
           prdMpsBomDetailList: allValues.tablesValue[1].tableData,
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
      if (changedValues.bizPlanDetailIds !== undefined) {
        // 直接加载明细
        requestSubTableData(prdMpsDetailListByIds, {id: `${changedValues.bizPlanDetailIds}`}, prdMpsDetailTable);
        // 加载BOM明细
        requestSubTableData(prdMpsBomDetailListByIds, {id: `${changedValues.bizPlanDetailIds}`}, prdMpsBomDetailTable);

      }


    }
    function handleValueChange({row, column, value}) {
      // 只在计划数量变化时处理
      if (column.key === 'qty') {

        const materialCode = row.materialCode
        const qty = Number(value) || 0

        const dataSource = prdMpsBomDetailTable.dataSource || []
        if (!materialCode || dataSource.length === 0) return

        dataSource.forEach(item => {
          if (item.productionMaterialCode === materialCode) {
            const standardQty = Number(item.standardQty) || 0
            item.qty = round(qty * standardQty)
            // 同步 bomCode 到当前行
            row.bomCode = item.bomCode
            console.log(item)
          }
        })
        prdMpsBomDetailTable.dataSource=[...dataSource]
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
