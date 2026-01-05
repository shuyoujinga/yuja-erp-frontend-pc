<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="1600" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="组装单_明细" key="invAssemblyDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="invAssemblyDetail"
          :loading="invAssemblyDetailTable.loading"
          :columns="invAssemblyDetailTable.columns"
          :dataSource="invAssemblyDetailTable.dataSource"
          :height="340"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"
          @valueChange="handleValueChange"
          />
      </a-tab-pane>
      <a-tab-pane tab="组装单_材料明细" key="invAssemblyBomDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="invAssemblyBomDetail"
          :loading="invAssemblyBomDetailTable.loading"
          :columns="invAssemblyBomDetailTable.columns"
          :dataSource="invAssemblyBomDetailTable.dataSource"
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
    import {formSchema,invAssemblyDetailColumns,invAssemblyBomDetailColumns} from '../InvAssembly.data';
    import {saveOrUpdate,invAssemblyDetailList,invAssemblyBomDetailList} from '../InvAssembly.api';
    import {getMaterialInfoAndBomList} from "@/api/common/api";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['invAssemblyDetail', 'invAssemblyBomDetail', ]);
    const activeKey = ref('invAssemblyDetail');
    const invAssemblyDetail = ref();
    const invAssemblyBomDetail = ref();
    const tableRefs = {invAssemblyDetail, invAssemblyBomDetail, };
    const invAssemblyDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:invAssemblyDetailColumns
    })
    const invAssemblyBomDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:invAssemblyBomDetailColumns
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
             requestSubTableData(invAssemblyDetailList, {id:data?.record?.id}, invAssemblyDetailTable)
             requestSubTableData(invAssemblyBomDetailList, {id:data?.record?.id}, invAssemblyBomDetailTable)
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
      activeKey.value = 'invAssemblyDetail';
      invAssemblyDetailTable.dataSource = [];
      invAssemblyBomDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           invAssemblyDetailList: allValues.tablesValue[0].tableData,
           invAssemblyBomDetailList: allValues.tablesValue[1].tableData,
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

    function handleValueChange({row, column, value}) {
      // 只在计划数量变化时处理
      if (column.key === 'qty') {

        const materialCode = row.materialCode
        const qty = Number(value) || 0

        const dataSource = invAssemblyBomDetailTable.dataSource || []
        if (!materialCode || dataSource.length === 0) return

        dataSource.forEach(item => {
          if (item.productionMaterialCode === materialCode) {
            const standardQty = Number(item.standardQty) || 0
            item.qty = round(qty * standardQty)
            item.amount = round(item.qty * item.unitPrice)
            // 同步 bomCode 到当前行
            row.bomCode = item.bomCode
          }
        })

        // 如果你的表格不是响应式的，必须强制触发更新
        invAssemblyBomDetailTable.dataSource = [...dataSource]
      }

      if (column.key === 'materialCode' && value) {

        getMaterialInfoAndBomList(value).then(res => {
          if (!res) return

          const material = res
          row.specifications = material.specifications
          row.unit = material.unit
          row.unitPrice=material.unitPrice
          row.stockQty = material.stockQty
          row.qty=null
          const bomInfoList = material.bomInfoList || []



          const dataSource = invAssemblyBomDetailTable.dataSource || []


          // ② 构建已有联合主键集合
          const existKeySet = new Set(
            dataSource.map(
              item => `${item.productionMaterialCode}__${item.materialCode}`
            )
          )


          // ③ 找出需要补充的 BOM 行（严格联合主键）
          const needAppendList = bomInfoList.filter(bom => {
            const key = `${value}__${bom.materialCode}`
            return !existKeySet.has(key)
          })
          const detailDataSource = invAssemblyBomDetailTable.dataSource || []

          // 1. 提取 materialCode 集合（去空值）
          let materialCodeList = detailDataSource
            .map(item => item.materialCode)
            .filter(Boolean)
          // ④ 只追加缺失的，不覆盖已有的
          if (needAppendList.length > 0||!materialCodeList.includes(value)) {


            // 2. 过滤 dataSource：productionMaterialCode 不在 materialCodeList 中
            const filteredDataSource = dataSource.filter(
              item => !materialCodeList.includes(item.productionMaterialCode)
            )


            // ② 用新的 BOM 覆盖
            invAssemblyBomDetailTable.dataSource = [
              ...filteredDataSource,
              ...needAppendList.map(bom => ({
                bomCode: bom.bomCode,
                productionMaterialCode: value,
                materialCode: bom.materialCode,
                unit: bom.unit,
                specifications: bom.specifications,
                standardQty: bom.standardQty,
                unitPrice: bom.unitPrice,

              }))

            ]

          }

        })



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
