<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="分类" v-bind="validateInfos.materialCategory">
	          <j-category-select v-model:value="formData.materialCategory"  pcode="MC" placeholder="请选择分类" back="code" :disabled="disabled" @change="(value) => handleFormChange('materialCategory', value)" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="名称" v-bind="validateInfos.materialName">
            <a-input v-model:value="formData.materialName" placeholder="请输入名称" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="编码" v-bind="validateInfos.materialCode">
            <a-input  v-model:value="formData.materialCode" placeholder="请输入编码" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="规格" v-bind="validateInfos.specifications">
            <a-input v-model:value="formData.specifications" placeholder="请输入规格" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="仓位" v-bind="validateInfos.stock">
            <a-input v-model:value="formData.stock" placeholder="请输入仓位" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单位" v-bind="validateInfos.unit">
            <j-search-select v-model:value="formData.unit" dict=dict_materials_unit placeholder="请选择单位" :disabled="disabled"></j-search-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="单价" v-bind="validateInfos.unitPrice">
            <a-input-number style="width: 100%" v-model:value="formData.unitPrice" placeholder="请输入单价" :disabled="disabled"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" v-bind="validateInfos.remark">
            <a-input v-model:value="formData.remark" placeholder="请输入备注" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JCategorySelect from '/@/components/Form/src/jeecg/components/JCategorySelect.vue';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../YujiakejiMaterials.api';
  import { Form } from 'ant-design-vue';
  import JSearchSelect from "@/components/Form/src/jeecg/components/JSearchSelect.vue";
  
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: ()=>{} },
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    materialCategory: '',   
    materialName: '',   
    materialCode: '',   
    specifications: '',   
    stock: '',   
    unit: '',   
    unitPrice: '',   
    remark: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    materialCategory: [{ required: true, message: '请输入分类!'},],
    materialName: [{ required: true, message: '请输入名称!'},],
    unit: [{ required: true, message: '请输入单位!'},],
    unitPrice: [{ required: true, message: '请输入单价!'},],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
        return true;
      }
    }
    return props.formDisabled;
  });

  
  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      const tmpData = {};
      Object.keys(formData).forEach((key) => {
        if(record.hasOwnProperty(key)){
          tmpData[key] = record[key]
        }
      })
      //赋值
      Object.assign(formData, tmpData);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  /**
   * 值改变事件触发
   * @param key
   * @param value
   */
  function handleFormChange(key, value) {
    formData[key] = value;
  }
  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 500px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
