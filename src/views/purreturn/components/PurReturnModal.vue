<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1200" @ok="handleSubmit">
      <BasicForm @register="registerForm" @valuesChange="handleFormChange" ref="formRef"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="采购退货_明细" key="purReturnDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="purReturnDetail"
          :loading="purReturnDetailTable.loading"
          :columns="purReturnDetailTable.columns"
          :dataSource="purReturnDetailTable.dataSource"
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
    import {formSchema,purReturnDetailColumns} from '../PurReturn.data';
    import {
      saveOrUpdate,
      purReturnDetailList,
      purReturnDetailListByIds,
      getSmartRemark
    } from '../PurReturn.api';
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['purReturnDetail', ]);
    const activeKey = ref('purReturnDetail');
    const purReturnDetail = ref();
    const tableRefs = {purReturnDetail, };
    const purReturnDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:purReturnDetailColumns
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
             requestSubTableData(purReturnDetailList, {id:data?.record?.id}, purReturnDetailTable)
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
      activeKey.value = 'purReturnDetail';
      purReturnDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           purReturnDetailList: allValues.tablesValue[0].tableData,
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

    // 监听 form valuesChange
    function handleFormChange(changedValues, allValues) {
      console.log('changed:', changedValues);
      console.log('allValues：',allValues)
      if (changedValues.supplierCode !== undefined) {
        const supplier = changedValues.supplierCode;
        // 找到 orderCode 字段对应的表单控件，更新 param
        setProps({
          schemas: formSchema.map((s) => {
            if (s.field === 'orderCodes') {
              return {
                ...s,
                componentProps: ({ formActionType }) => {
                  const { setFieldsValue } = formActionType;
                  return {
                    setFieldsValue: setFieldsValue,
                    code: "report_pur_order",
                    fieldConfig: [
                      { source: 'doc_code', target: 'orderCodes' },
                      { source: 'main_id', target: 'orderIds' },
                      { source: 'detail_id', target: 'orderDetailId' }
                    ],
                    multi: true,
                    // 动态 param，使用最新 supplierCode
                    param: { supplier_code: supplier ? `'${supplier}'` : "''" }
                  };
                },
              };
            }
            return s;
          }),
        });
      }

      if (changedValues.orderDetailId !== undefined) {

        // 调智能备注接口
        getSmartRemark({
          orderDetailId: changedValues.orderDetailId,
          supplierCode: allValues.supplierCode,
        }).then((remark) => {
          formRef.value.setFieldsValue({
            remark: remark,
          });
        });

        // 用户真正修改 → 必定触发
        requestSubTableData(
          purReturnDetailListByIds,
          { id: changedValues.orderDetailId },
          purReturnDetailTable
        );
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
