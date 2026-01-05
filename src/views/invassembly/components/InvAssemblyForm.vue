<template>
  <div>
    <BasicForm @register="registerForm" ref="formRef"/>
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated  @change="handleChangeTabs">
          <a-tab-pane tab="组装单_明细" key="invAssemblyDetail" :forceRender="true">
            <JVxeTable
              keep-source
              resizable
              ref="invAssemblyDetail"
              v-if="invAssemblyDetailTable.show"
              :loading="invAssemblyDetailTable.loading"
              :columns="invAssemblyDetailTable.columns"
              :dataSource="invAssemblyDetailTable.dataSource"
              :height="340"
              :rowNumber="true"
              :rowSelection="true"
              :disabled="formDisabled"
              :toolbar="true"
            />
          </a-tab-pane>
          <a-tab-pane tab="组装单_材料明细" key="invAssemblyBomDetail" :forceRender="true">
            <JVxeTable
              keep-source
              resizable
              ref="invAssemblyBomDetail"
              v-if="invAssemblyBomDetailTable.show"
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
  import {getBpmFormSchema,invAssemblyDetailColumns,invAssemblyBomDetailColumns} from '../InvAssembly.data';
  import {saveOrUpdate,invAssemblyDetailList,invAssemblyBomDetailList} from '../InvAssembly.api';

  export default defineComponent({
    name: "InvAssemblyForm",
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

      const refKeys = ref(['invAssemblyDetail', 'invAssemblyBomDetail', ]);
      const activeKey = ref('invAssemblyDetail');
      const invAssemblyDetail = ref();
      const invAssemblyBomDetail = ref();
      const tableRefs = {invAssemblyDetail, invAssemblyBomDetail, };
      const invAssemblyDetailTable = reactive({
        loading: false,
        dataSource: [],
        columns:invAssemblyDetailColumns,
        show: false
      })
      const invAssemblyBomDetailTable = reactive({
        loading: false,
        dataSource: [],
        columns:invAssemblyBomDetailColumns,
        show: false
      })

      const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys,validateSubForm);

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
        await saveOrUpdate(values, true);
      }

      const queryByIdUrl = '/invassembly/invAssembly/queryById';
      async function initFormData(){
        let params = {id: props.formData.dataId};
        const data = await defHttp.get({url: queryByIdUrl, params});
        //设置表单的值
        await setFieldsValue({...data});
        requestSubTableData(invAssemblyDetailList, {id: data.id}, invAssemblyDetailTable, ()=>{
          invAssemblyDetailTable.show = true;
        });
        requestSubTableData(invAssemblyBomDetailList, {id: data.id}, invAssemblyBomDetailTable, ()=>{
          invAssemblyBomDetailTable.show = true;
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
        invAssemblyDetail,
        invAssemblyBomDetail,
        invAssemblyDetailTable,
        invAssemblyBomDetailTable,
      }
    }
  });
</script>