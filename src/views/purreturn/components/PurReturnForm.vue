<template>
  <div>
    <BasicForm @register="registerForm" ref="formRef"/>
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" animated  @change="handleChangeTabs">
          <a-tab-pane tab="采购退货_明细" key="purReturnDetail" :forceRender="true">
            <JVxeTable
              keep-source
              resizable
              ref="purReturnDetail"
              v-if="purReturnDetailTable.show"
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
  import {getBpmFormSchema,purReturnDetailColumns} from '../PurReturn.data';
  import {saveOrUpdate,purReturnDetailList} from '../PurReturn.api';

  export default defineComponent({
    name: "PurReturnForm",
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

      const refKeys = ref(['purReturnDetail', ]);
      const activeKey = ref('purReturnDetail');
      const purReturnDetail = ref();
      const tableRefs = {purReturnDetail, };
      const purReturnDetailTable = reactive({
        loading: false,
        dataSource: [],
        columns:purReturnDetailColumns,
        show: false
      })

      const [handleChangeTabs,handleSubmit,requestSubTableData,formRef] = useJvxeMethod(requestAddOrEdit,classifyIntoFormData,tableRefs,activeKey,refKeys,validateSubForm);

      function classifyIntoFormData(allValues) {
        let main = Object.assign({}, allValues.formValue)
        return {
          ...main, // 展开
          purReturnDetailList: allValues.tablesValue[0].tableData,
        }
      }

      //表单提交事件
      async function requestAddOrEdit(values) {
        await saveOrUpdate(values, true);
      }

      const queryByIdUrl = '/purreturn/purReturn/queryById';
      async function initFormData(){
        let params = {id: props.formData.dataId};
        const data = await defHttp.get({url: queryByIdUrl, params});
        //设置表单的值
        await setFieldsValue({...data});
        requestSubTableData(purReturnDetailList, {id: data.id}, purReturnDetailTable, ()=>{
          purReturnDetailTable.show = true;
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
        purReturnDetail,
        purReturnDetailTable,
      }
    }
  });
</script>