<!--popup组件-->
<template>
  <div class="components-input-demo-presuffix" v-if="avalid">
    <!--输入框-->
    <a-input @click="handleOpen" v-model:value="showText" :placeholder="placeholder" readOnly v-bind="attrs">
      <template #prefix>
        <Icon icon="ant-design:cluster-outlined"></Icon>
      </template>
    </a-input>
    <!--popup弹窗-->
    <JPopupOnlReportModal
      @register="regModal"
      :code="code"
      :multi="multi"
      :sorter="sorter"
      :groupId="uniqGroupId"
      :param="param"
      @ok="callBack"
      :getContainer="getContainer"
    ></JPopupOnlReportModal>
  </div>
</template>

<script lang="ts">
import JPopupOnlReportModal from './modal/JPopupOnlReportModal.vue';
import { defineComponent, ref,  onMounted, watch, computed } from 'vue';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  name: 'JPopup',
  components: {
    JPopupOnlReportModal,
  },
  inheritAttrs: false,
  props: {
    code: propTypes.string.def(''),
    value: propTypes.string.def(''),
    sorter: propTypes.string.def(''),
    width: propTypes.number.def(1200),
    placeholder: propTypes.string.def('请选择'),
    multi: propTypes.bool.def(false),
    param: propTypes.object.def({}),
    spliter: propTypes.string.def(','),
    groupId: propTypes.string.def(''),
    formElRef: propTypes.object,
    setFieldsValue: propTypes.func,
    getContainer: propTypes.func,
    fieldConfig: {
      type: Array,
      default: () => [],
    },

  },
  emits: ['update:value', 'register', 'popUpChange', 'focus'],
  setup(props, { emit }) {
    const { createMessage } = useMessage();
    const attrs = useAttrs();
    // pop是否展示
    const avalid = ref(true);
    const showText = ref('');
    // 注册model
    const [regModal, { openModal }] = useModal();
    // 表单值
    let { code, fieldConfig } = props;
    // 唯一分组groupId
    const uniqGroupId = computed(() => (props.groupId ? `${props.groupId}_${code}_${fieldConfig[0]['source']}_${fieldConfig[0]['target']}` : ''));

    onMounted(() => {
      if (props.fieldConfig.length === 0) {
        createMessage.error('popup参数未正确配置!');
        avalid.value = false;
      }
      // 自动打开弹出框（如果 openByDefault 为 true）
      if (props.openByDefault) {
        openModal(true);
      }
    });

    watch(
      () => props.value,
      (val) => {
        showText.value = val && val.length > 0 ? val.split(props.spliter).join(',') : '';
      },
      { immediate: true }
    );

    function handleOpen() {
      emit('focus');
      !props.disabled && openModal(true);
    }

    function handleEmpty() {
      showText.value = '';
    }

    function callBack(rows) {
      let { fieldConfig } = props;
      let values = {};
      for (let item of fieldConfig) {
        let val = rows.map((row) => row[item.source]);
        val = val.length === 1 ? val[0] : val.join(',');
        item.target.split(',').forEach((target) => {
          values[target] = val;
        });
      }
      props.formElRef && props.formElRef.setFieldsValue(values);
      props.setFieldsValue && props.setFieldsValue(values);
      emit('popUpChange', values);
    }

    return {
      showText,
      avalid,
      uniqGroupId,
      attrs,
      regModal,
      handleOpen,
      callBack,
      handleEmpty
    };
  },
});
</script>
