<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange" />
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="其他入库_明细" key="invMiscInDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="invMiscInDetail"
          :loading="invMiscInDetailTable.loading"
          :columns="invMiscInDetailTable.columns"
          :dataSource="invMiscInDetailTable.dataSource"
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
    import {formSchema,invMiscInDetailColumns} from '../InvMiscIn.data';
    import {saveOrUpdate,invMiscInDetailList} from '../InvMiscIn.api';
    import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils'
    import {getDictItems, getStockMaterial} from "@/api/common/api";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['invMiscInDetail', ]);
    const activeKey = ref('invMiscInDetail');
    const invMiscInDetail = ref();
    const tableRefs = {invMiscInDetail, };
    const invMiscInDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:invMiscInDetailColumns
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
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
             requestSubTableData(invMiscInDetailList, {id:data?.record?.id}, invMiscInDetailTable)
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
      activeKey.value = 'invMiscInDetail';
      invMiscInDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           invMiscInDetailList: allValues.tablesValue[0].tableData,
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
      // 主表取值（一次取全量，不要频繁调用）
      const { warehouseCode } = getFieldsValue() || {};

      // 只在“物料变化 + 仓库已选”的情况下查库存物料
      if (column.key === 'materialCode' && value && warehouseCode) {
        getStockMaterial(value, warehouseCode).then((material) => {
          if (!material) {
            clearMaterialRow(row);
            return;
          }

          row.specifications = material.specifications;
          row.unit = material.unit;
          row.unitPrice = material.unitPrice;
          row.stockQty = material.stockQty;
        });
      }


    }

    function clearMaterialRow(row) {
      row.specifications = '';
      row.unit = '';
      row.unitPrice = 0;
      row.stockQty = 0;
    }



    function handleFormChange(changedValues) {
      if (changedValues.warehouseCode !== undefined) {
        // 1. 清空明细数据
        invMiscInDetailTable.dataSource = []

        // 2. 清空物料列字典
        const materialColumn = invMiscInDetailTable.columns[0]
        delete materialColumn.dictCode
        delete materialColumn.options

        materialColumn.options = []

        // 3. 重新加载字典
        getDictItems(`CurrentStockMaterial,${changedValues.warehouseCode}`)
          .then(res => {
            if (!Array.isArray(res)) return
            materialColumn.options = res.map(item => ({
              title: item.text,
              text: item.text,
              value: item.value
            }))
          })
        invMiscInDetailTable.columns = [...invMiscInDetailTable.columns]
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
