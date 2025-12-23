<template>
  <div>
    <BasicForm @register="registerForm" ref="formRef"/>
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated  @change="handleChangeTabs">
          <a-tab-pane tab="业务计划_明细" key="salBizPlanDetail" :forceRender="true">
            <JVxeTable
              keep-source
              resizable
              ref="salBizPlanDetail"
              v-if="salBizPlanDetailTable.show"
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
              v-if="salBizPlanBomDetailTable.show"
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
  import {getBpmFormSchema,salBizPlanDetailColumns,salBizPlanBomDetailColumns} from '../SalBizPlan.data';
  import {saveOrUpdate,salBizPlanDetailList,salBizPlanBomDetailList} from '../SalBizPlan.api';

  export default defineComponent({
    name: "SalBizPlanForm",
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

      const refKeys = ref(['salBizPlanDetail', 'salBizPlanBomDetail', ]);
      const activeKey = ref('salBizPlanDetail');
      const salBizPlanDetail = ref();
      const salBizPlanBomDetail = ref();
      const tableRefs = {salBizPlanDetail, salBizPlanBomDetail, };
      const salBizPlanDetailTable = reactive({
        loading: false,
        dataSource: [],
        columns:salBizPlanDetailColumns,
        show: false
      })
      const salBizPlanBomDetailTable = reactive({
        loading: false,
        dataSource: [],
        columns:salBizPlanBomDetailColumns,
        show: false
      })

      const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys,validateSubForm);

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
        await saveOrUpdate(values, true);
      }

      const queryByIdUrl = '/salbizplan/salBizPlan/queryById';
      async function initFormData(){
        let params = {id: props.formData.dataId};
        const data = await defHttp.get({url: queryByIdUrl, params});
        //设置表单的值
        await setFieldsValue({...data});
        requestSubTableData(salBizPlanDetailList, {id: data.id}, salBizPlanDetailTable, ()=>{
          salBizPlanDetailTable.show = true;
        });
        requestSubTableData(salBizPlanBomDetailList, {id: data.id}, salBizPlanBomDetailTable, ()=>{
          salBizPlanBomDetailTable.show = true;
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
        salBizPlanDetail,
        salBizPlanBomDetail,
        salBizPlanDetailTable,
        salBizPlanBomDetailTable,
      }
    }
  });
</script>