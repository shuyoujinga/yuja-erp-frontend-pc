<template>
  <div>
    <BasicForm @register="registerForm" ref="formRef"/>
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated  @change="handleChangeTabs">
          <a-tab-pane tab="采购报价_明细" key="purSupplierQuotationDetail" :forceRender="true">
            <JVxeTable
              keep-source
              resizable
              ref="purSupplierQuotationDetail"
              v-if="purSupplierQuotationDetailTable.show"
              :loading="purSupplierQuotationDetailTable.loading"
              :columns="purSupplierQuotationDetailTable.columns"
              :dataSource="purSupplierQuotationDetailTable.dataSource"
              :height="auto"
              :rowNumber="true"
              :rowSelection="true"
              :disabled="formDisabled"
              :toolbar="true"
            />
          </a-tab-pane>
    </a-tabs>

    <div style="width: 100%;text-align: center" v-if="!formDisabled">
      <a-button @click="handleSubmit" pre-icon="ant-design:check" type="primary">提 交</a-button>
    </div>
  </div>
</template>

<script lang="ts">

  import {BasicForm, useForm} from '/@/components/Form/index';
  import { computed, defineComponent, reactive, ref, unref } from 'vue';
  import {defHttp} from '/@/utils/http/axios';
  import { propTypes } from '/@/utils/propTypes';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods';
  import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils';
  import {getBpmFormSchema,purSupplierQuotationDetailColumns} from '../PurSupplierQuotation.data';
  import {saveOrUpdate,purSupplierQuotationDetailList} from '../PurSupplierQuotation.api';

  export default defineComponent({
    name: "PurSupplierQuotationForm",
    components:{
      BasicForm,
    },
    props:{
      formData: propTypes.object.def({}),
      formBpm: propTypes.bool.def(true),
    },
    setup(props){
      const [registerForm, { setFieldsValue, setProps }] = useForm({
        labelWidth: 150,
        schemas: getBpmFormSchema(props.formData),
        showActionButtonGroup: false,
        baseColProps: {span: 12}
      });

      const formDisabled = computed(()=>{
        if(props.formData.disabled === false){
          return false;
        }
        return true;
      });

      const refKeys = ref(['purSupplierQuotationDetail', ]);
      const activeKey = ref('purSupplierQuotationDetail');
      const purSupplierQuotationDetail = ref();
      const tableRefs = {purSupplierQuotationDetail, };
      const purSupplierQuotationDetailTable = reactive({
        loading: false,
        dataSource: [],
        columns:purSupplierQuotationDetailColumns,
        show: false
      })

      const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys,validateSubForm);

      function classifyIntoFormData(allValues) {
        let main = Object.assign({}, allValues.formValue)
        return {
          ...main, // 展开
          purSupplierQuotationDetailList: allValues.tablesValue[0].tableData,
        }
      }

      //表单提交事件
      async function requestAddOrEdit(values) {
        await saveOrUpdate(values, true);
      }

      const queryByIdUrl = '/supplierquotation/purSupplierQuotation/queryById';
      async function initFormData(){
        let params = {id: props.formData.dataId};
        const data = await defHttp.get({url: queryByIdUrl, params});
        //设置表单的值
        await setFieldsValue({...data});
        requestSubTableData(purSupplierQuotationDetailList, {id: data.id}, purSupplierQuotationDetailTable, ()=>{
          purSupplierQuotationDetailTable.show = true;
        });
        //默认是禁用
        await setProps({disabled: formDisabled.value})
      }

      initFormData();

      return {
        registerForm,
        formDisabled,
        formRef,
        handleSubmit,
        activeKey,
        handleChangeTabs,
        purSupplierQuotationDetail,
        purSupplierQuotationDetailTable,
      }
    }
  });
</script>
