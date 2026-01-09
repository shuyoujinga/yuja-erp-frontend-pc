<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1500" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="生产退料_明细" key="prdReturnDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="prdReturnDetail"
          :loading="prdReturnDetailTable.loading"
          :columns="prdReturnDetailTable.columns"
          :dataSource="prdReturnDetailTable.dataSource"
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
    import {formSchema,prdReturnDetailColumns} from '../PrdReturn.data';
    import {saveOrUpdate, prdReturnDetailList, prdReturnDetailListByIds} from '../PrdReturn.api';
    import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils'
    import {prdIssueDetailListByIds} from "@/views/prdissue/PrdIssue.api";
    import {useMessage} from "@/hooks/web/useMessage";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['prdReturnDetail', ]);
    const activeKey = ref('prdReturnDetail');
    const prdReturnDetail = ref();
    const tableRefs = {prdReturnDetail, };
    const prdReturnDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:prdReturnDetailColumns
    })
    const { createMessage } = useMessage()
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
             requestSubTableData(prdReturnDetailList, {id:data?.record?.id}, prdReturnDetailTable)
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
      activeKey.value = 'prdReturnDetail';
      prdReturnDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           prdReturnDetailList: allValues.tablesValue[0].tableData,
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
    function handleFormChange(changedValues, allValues) {
      // 只监听 workOrderDetailIds
      if (changedValues.workOrderDetailIds === undefined) return;
      console.log('数量是',changedValues.qtyStr)
      const {
        materialCode: materialCodeStr = '',
        qtyStr: qtyStr = '',
      } = allValues || {};
      console.log('数量是',changedValues.qtyStr)
      // ===== materialCode 处理 =====
      const materialCodeArr = String(materialCodeStr)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const uniqueMaterialCodes = [...new Set(materialCodeArr)];

      // ❌ materialCode 不完全一致
      if (uniqueMaterialCodes.length !== 1) {
        createMessage.error('操作失败，生产产品必须完全一致');

        formRef.value?.setFieldsValue({
          workOrderDetailIds: [],
          materialCode: undefined,
          qty: undefined,
        });

        return;
      }

      const materialCode = uniqueMaterialCodes[0];

      // ===== qty 处理 =====
      const qtyArr = String(qtyStr)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      // 规则：不校验一致性，直接取第一个
      const qty = Number(qtyArr[0]) || 0;

      // ===== 回填 =====
      formRef.value?.setFieldsValue({
        materialCode,
        qty,
      });

      // ===== 请求子表 =====
      requestSubTableData(
        prdReturnDetailListByIds,
        { id: changedValues.workOrderDetailIds },
        prdReturnDetailTable
      );
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
