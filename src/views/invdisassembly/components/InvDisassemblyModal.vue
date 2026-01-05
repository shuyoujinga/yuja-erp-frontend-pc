<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="2000" @ok="handleSubmit">
      <BasicForm @register="registerForm" ref="formRef" @valuesChange="handleFormChange"/>
  <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated @change="handleChangeTabs">
      <a-tab-pane tab="拆卸单_明细" key="invDisassemblyDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="invDisassemblyDetail"
          :loading="invDisassemblyDetailTable.loading"
          :columns="invDisassemblyDetailTable.columns"
          :dataSource="invDisassemblyDetailTable.dataSource"
          :height="auto"
          :rowNumber="true"
          :rowSelection="true"
          :disabled="formDisabled"
          :toolbar="true"
          @valueChange="handleValueChange"
          />
      </a-tab-pane>
      <a-tab-pane tab="拆卸单_材料清单" key="invDisassemblyBomDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="invDisassemblyBomDetail"
          :loading="invDisassemblyBomDetailTable.loading"
          :columns="invDisassemblyBomDetailTable.columns"
          :dataSource="invDisassemblyBomDetailTable.dataSource"
          :rowNumber="true"
          :height="auto"
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
    import {formSchema,invDisassemblyDetailColumns,invDisassemblyBomDetailColumns} from '../InvDisassembly.data';
    import {saveOrUpdate,invDisassemblyDetailList,invDisassemblyBomDetailList} from '../InvDisassembly.api';
    import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils'
    import {getDictItems, getMaterialInfoAndBomList} from "@/api/common/api";
    import data from "emoji-mart-vue-fast/data/apple.json";
    // Emits声明
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    const formDisabled = ref(false);
    const refKeys = ref(['invDisassemblyDetail', 'invDisassemblyBomDetail', ]);
    const activeKey = ref('invDisassemblyDetail');
    const invDisassemblyDetail = ref();
    const invDisassemblyBomDetail = ref();
    const tableRefs = {invDisassemblyDetail, invDisassemblyBomDetail, };
    const invDisassemblyDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:invDisassemblyDetailColumns
    })
    const invDisassemblyBomDetailTable = reactive({
          loading: false,
          dataSource: [],
          columns:invDisassemblyBomDetailColumns
    })
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
             requestSubTableData(invDisassemblyDetailList, {id:data?.record?.id}, invDisassemblyDetailTable)
             requestSubTableData(invDisassemblyBomDetailList, {id:data?.record?.id}, invDisassemblyBomDetailTable)
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
      activeKey.value = 'invDisassemblyDetail';
      invDisassemblyDetailTable.dataSource = [];
      invDisassemblyBomDetailTable.dataSource = [];
    }
    function classifyIntoFormData(allValues) {
         let main = Object.assign({}, allValues.formValue)
         return {
           ...main, // 展开
           invDisassemblyDetailList: allValues.tablesValue[0].tableData,
           invDisassemblyBomDetailList: allValues.tablesValue[1].tableData,
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
      if (changedValues.outWarehouseCode !== undefined) {
        // 1. 清空明细数据
        invDisassemblyDetailTable.dataSource = []

        // 2. 清空物料列字典
        const materialColumn = invDisassemblyDetailTable.columns[0]
        delete materialColumn.dictCode
        delete materialColumn.options

        materialColumn.options = []

        // 3. 重新加载字典
        getDictItems(`CurrentStockMaterial,${changedValues.outWarehouseCode}`)
          .then(res => {
            if (!Array.isArray(res)) return
            materialColumn.options = res.map(item => ({
              title: item.text,
              text: item.text,
              value: item.value
            }))
          })
        invDisassemblyDetailTable.columns = [...invDisassemblyDetailTable.columns]
      }
    }
    function handleValueChange({row, column, value}) {
      // 只在计划数量变化时处理
      if (column.key === 'qty') {

        const materialCode = row.materialCode
        const qty = Number(value) || 0

        const dataSource = invDisassemblyBomDetailTable.dataSource || []
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
        invDisassemblyBomDetailTable.dataSource = [...dataSource]
      }

      if (column.key === 'materialCode' && value) {
        const { outWarehouseCode } = getFieldsValue() || {};

        getMaterialInfoAndBomList(value+'#'+outWarehouseCode).then(res => {
          if (!res) return

          const material = res
          row.specifications = material.specifications
          row.unit = material.unit
          row.unitPrice=material.unitPrice
          row.stockQty = material.stockQty
          row.qty=null
          const bomInfoList = material.bomInfoList || []



          const dataSource = invDisassemblyBomDetailTable.dataSource || []


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
          const detailDataSource = invDisassemblyDetailTable.dataSource || []

          // 1. 提取 materialCode 集合（去空值）
          let materialCodeList = detailDataSource
            .map(item => item.materialCode)
            .filter(Boolean)
          console.log('xxxwuliao ',materialCodeList)
          console.log('xxxwuliao ',value)
          // ④ 只追加缺失的，不覆盖已有的
          if (needAppendList.length > 0||!materialCodeList.includes(value)) {


            // 2. 过滤 dataSource：productionMaterialCode 不在 materialCodeList 中
            const filteredDataSource = dataSource.filter(
              item => !materialCodeList.includes(item.productionMaterialCode)
            )
            console.log('xxxwuliaxsso ',filteredDataSource)


            // ② 用新的 BOM 覆盖
            invDisassemblyBomDetailTable.dataSource = [
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
