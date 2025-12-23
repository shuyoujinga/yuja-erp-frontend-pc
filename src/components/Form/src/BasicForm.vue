<template>
  <Form v-bind="getBindValue" :class="getFormClass" ref="formElRef" :model="formModel" @keypress.enter="handleEnterPress">
    <Row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem
          :tableAction="tableAction"
          :formActionType="formActionType"
          :schema="schema"
          :formProps="getProps"
          :allDefaultValues="defaultValueRef"
          :formModel="formModel"
          :setFormModel="setFormModel"
          :validateFields="validateFields"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>

      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template #[item]="data" v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </Row>
  </Form>
</template>
<script lang="ts">
import type { FormActionType, FormProps, FormSchema } from './types/form';
import type { AdvanceState } from './types/hooks';
import type { Ref } from 'vue';

import { defineComponent, reactive, ref, computed, unref, onMounted, watch, nextTick } from 'vue';
import { Form, Row } from 'ant-design-vue';
import FormItem from './components/FormItem.vue';
import FormAction from './components/FormAction.vue';

import { dateItemType } from './helper';
import { dateUtil } from '/@/utils/dateUtil';

// import { cloneDeep } from 'lodash-es';
import { deepMerge } from '/@/utils';

import { useFormValues } from './hooks/useFormValues';
import useAdvanced from './hooks/useAdvanced';
import { useFormEvents } from './hooks/useFormEvents';
import { createFormContext } from './hooks/useFormContext';
import { useAutoFocus } from './hooks/useAutoFocus';
import { useModalContext } from '/@/components/Modal';

import { basicProps } from './props';
import componentSetting from '/@/settings/componentSetting';

import { useDesign } from '/@/hooks/web/useDesign';
import dayjs from 'dayjs';
import { useDebounceFn } from '@vueuse/core';

export default defineComponent({
  name: 'BasicForm',
  components: { FormItem, Form, Row, FormAction },
  props: basicProps,
  // 注意：对外公开 valuesChange 事件
  emits: ['advanced-change', 'reset', 'submit', 'register', 'valuesChange'],
  setup(props, { emit, attrs }) {
    const formModel = reactive<Recordable>({});
    const modalFn = useModalContext();

    const advanceState = reactive<AdvanceState>({
      // 默认是收起状态
      isAdvanced: false,
      hideAdvanceBtn: true,
      isLoad: false,
      actionSpan: 6,
    });

    const defaultValueRef = ref<Recordable>({});
    const isInitedDefaultRef = ref(false);
    const propsRef = ref<Partial<FormProps>>({});
    const schemaRef = ref<Nullable<FormSchema[]>>(null);
    const formElRef = ref<Nullable<FormActionType>>(null);

    const { prefixCls } = useDesign('basic-form');

    // Get the basic configuration of the form
    const getProps = computed((): FormProps => {
      let mergeProps = { ...props, ...unref(propsRef) } as FormProps;
      if (mergeProps.labelWidth) {
        mergeProps.labelCol = undefined;
      }
      if (mergeProps.layout === 'inline') {
        if (mergeProps.labelCol === componentSetting.form.labelCol) {
          mergeProps.labelCol = undefined;
        }
        if (mergeProps.wrapperCol === componentSetting.form.wrapperCol) {
          mergeProps.wrapperCol = undefined;
        }
      }
      return mergeProps;
    });

    const getFormClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--compact`]: unref(getProps).compact,
        },
      ];
    });

    const getRow = computed((): Recordable => {
      const { baseRowStyle = {}, rowProps } = unref(getProps);
      return {
        style: baseRowStyle,
        ...rowProps,
      };
    });

    const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) } as Recordable));

    const getSchema = computed((): FormSchema[] => {
      const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
      for (const schema of schemas) {
        const { defaultValue, component, componentProps } = schema;
        if (defaultValue && dateItemType.includes(component)) {
          let valueFormat:string = "";
          if(componentProps){
            valueFormat = componentProps?.valueFormat;
          }
          if(!valueFormat){
            console.warn("未配置valueFormat,可能导致格式化错误！");
          }
          if (!Array.isArray(defaultValue)) {
            if(valueFormat){
              schema.defaultValue = dateUtil(defaultValue).format(valueFormat);
            }else{
              schema.defaultValue = dateUtil(defaultValue);
            }
          } else {
            const def: dayjs.Dayjs[] = [];
            defaultValue.forEach((item) => {
              if(valueFormat){
                def.push(dateUtil(item).format(valueFormat));
              }else{
                def.push(dateUtil(item));
              }
            });
            def.forEach((item, index) => {
              defaultValue[index] = item;
            });
          }
        }
      }
      if (unref(getProps).showAdvancedButton) {
        return schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[];
      } else {
        return schemas as FormSchema[];
      }
    });

    const { handleToggleAdvanced } = useAdvanced({
      advanceState,
      emit,
      getProps,
      getSchema,
      formModel,
      defaultValueRef,
    });

    const { handleFormValues, initDefault } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel,
    });

    useAutoFocus({
      getSchema,
      getProps,
      isInitedDefault: isInitedDefaultRef,
      formElRef: formElRef as Ref<FormActionType>,
    });

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateFields,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      scrollToField,
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formElRef as Ref<FormActionType>,
      schemaRef: schemaRef as Ref<FormSchema[]>,
      handleFormValues,
    });

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit,
    });

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        setFieldsValue(model);
      },
      {
        immediate: true,
      }
    );

    watch(
      () => unref(getProps).schemas,
      (schemas) => {
        resetSchema(schemas ?? []);
      }
    );

    watch(
      () => getSchema.value,
      async (schema) => {
        // 保证 modal 自适应在下一个 tick 完成
        await nextTick();
        modalFn?.redoModalHeight?.();

        // 如果已经初始化过，直接返回
        if (unref(isInitedDefaultRef)) {
          return;
        }

        if (schema?.length) {
          // 等 initDefault 完成（兼容 sync/async 实现）
          await initDefault();

          // 初始化完成后记录快照，避免 init 期间产生的噪音事件
          prevModelSnapshot.value = deepClone(formModel);

          // 标记已初始化完成（之后 watch 才会 emit valuesChange）
          isInitedDefaultRef.value = true;
        }
      }
    );


    async function setProps(formProps: Partial<FormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
    }

    // 防抖提交（原有）
    const onFormSubmitWhenChange = useDebounceFn(handleSubmit, 300);

    // —— 新增：前后快照，用于计算 changedValues
    const prevModelSnapshot = ref<Recordable>({});

    // 深拷贝工具（简单通用）
    function deepClone<T>(obj: T): T {
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch (e) {
        // 回退：浅拷贝
        return Object.assign({}, obj);
      }
    }

    // setFormModel 保留（控件内部可能调用）
    function setFormModel(key: string, value: any) {
      formModel[key] = value;
      // 其他原有逻辑：校验触发留空（注释）
      if (props.autoSearch === true) {
        onFormSubmitWhenChange();
      }
      // 注意：我们不在这里 emit，统一由下面的 watch 发出，以保证所有改动（包括直接 v-model）都会被捕获
    }

    watch(
      formModel,
      (newVal) => {
        if (!isInitedDefaultRef.value) {
          prevModelSnapshot.value = deepClone(newVal);
          return;
        }

        const prev = prevModelSnapshot.value || {};
        const cur = newVal || {};
        const changed = {};

        const keys = new Set([...Object.keys(prev), ...Object.keys(cur)]);

        keys.forEach((k) => {
          const a = prev[k] === undefined ? undefined : JSON.stringify(prev[k]);
          const b = cur[k] === undefined ? undefined : JSON.stringify(cur[k]);
          if (a !== b) {
            changed[k] = cur[k];
          }
        });

        if (Object.keys(changed).length > 0) {
          emit('valuesChange', changed, deepClone(cur));
        }

        prevModelSnapshot.value = deepClone(cur);
      },
      {
        deep: true,
        flush: 'post',
      },
    );


    function handleEnterPress(e: KeyboardEvent) {
      const { autoSubmitOnEnter } = unref(getProps);
      if (!autoSubmitOnEnter) return;
      if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        const target: HTMLElement = e.target as HTMLElement;
        if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
          handleSubmit();
        }
      }
    }

    const formActionType: Partial<FormActionType> = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      updateSchema,
      resetSchema,
      setProps,
      getProps,
      removeSchemaByFiled,
      appendSchemaByField,
      clearValidate,
      validateFields,
      validate,
      submit: handleSubmit,
      scrollToField: scrollToField,
    };

    onMounted(() => {
      // 不在这里 set isInitedDefaultRef / prevModelSnapshot
      // initDefault 会在 getSchema 的 watch 中被调用并完成快照设置
      emit('register', formActionType);
    });


    return {
      getBindValue,
      handleToggleAdvanced,
      handleEnterPress,
      formModel,
      defaultValueRef,
      advanceState,
      getRow,
      getProps,
      formElRef,
      getSchema,
      formActionType: formActionType as any,
      setFormModel,
      getFormClass,
      getFormActionBindProps: computed((): Recordable => ({ ...getProps.value, ...advanceState })),
      ...formActionType,
    };
  },
});
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-form';

.@{prefix-cls} {
  .ant-form-item {
    &-label label::after {
      margin: 0 6px 0 2px;
    }

    &-with-help {
      margin-bottom: 0;
    }

    &:not(.ant-form-item-with-help) {
      margin-bottom: 20px;
    }

    &.suffix-item {
      .ant-form-item-children {
        display: flex;
      }

      .ant-form-item-control {
        margin-top: 4px;
      }

      .suffix {
        display: inline-flex;
        padding-left: 6px;
        margin-top: 1px;
        line-height: 1;
        align-items: center;
      }
    }
  }
  /*【美化表单】form的字体改小一号*/
  .ant-form-item-label > label{
    font-size: 13px;
  }
  .ant-form-item .ant-select {
    font-size: 13px;
  }
  .ant-select-item-option-selected {
    font-size: 13px;
  }
  .ant-select-item-option-content {
    font-size: 13px;
  }
  .ant-input {
    font-size: 13px;
  }
  /*【美化表单】form的字体改小一号*/

  .ant-form-explain {
    font-size: 14px;
  }

  &--compact {
    .ant-form-item {
      margin-bottom: 8px !important;
    }
  }
  // update-begin--author:liaozhiyang---date:20231017---for：【QQYUN-6566】BasicForm支持一行显示(inline)
  &.ant-form-inline {
    & > .ant-row {
      .ant-col { width:auto !important; }
    }
  }
  // update-end--author:liaozhiyang---date:20231017---for：【QQYUN-6566】BasicForm支持一行显示(inline)
}
</style>
