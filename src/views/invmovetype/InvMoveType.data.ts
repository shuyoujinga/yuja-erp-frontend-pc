import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '移动类型编码',
    align: "center",
    dataIndex: 'moveType',
    customRender: ({record}) => {
      return h(
        'a',
        {
          style: {color: '#1890ff', cursor: 'pointer'},
          onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
        },
        record.moveType,
      );
    }
  },
  {
    title: '移动类型说明',
    align: "center",
    dataIndex: 'moveDesc'
  },
  {
    title: '出入库类型',
    align: "center",
    dataIndex: 'direction_dictText'
  },
  {
    title: '影响成本',
    align: "center",
    dataIndex: 'affectCost_dictText'
  },
  {
    title: '允许冲销',
    align: "center",
    dataIndex: 'isReversal_dictText'
  },
  {
    title: '业务类型',
    align: "center",
    dataIndex: 'bizType_dictText'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "移动类型编码",
    field: 'moveType',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "移动类型说明",
    field: 'moveDesc',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "业务类型",
    field: 'bizType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "dict_biz_type"
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '移动类型编码',
    field: 'moveType',
    component: 'Input',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入移动类型编码!'},
      ];
    },
  },
  {
    label: '移动类型说明',
    field: 'moveDesc',
    component: 'Input',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入移动类型说明!'},
      ];
    },
  },
  {
    label: '出入库类型',
    field: 'direction',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_in_out_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入出入库类型!'},
      ];
    },
  },
  {
    label: '影响成本',
    field: 'affectCost',
    component: 'JSearchSelect',
    componentProps: {
      dict: "yn"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入影响成本!'},
      ];
    },
  },
  {
    label: '允许冲销',
    field: 'isReversal',
    component: 'JSearchSelect',
    componentProps: {
      dict: "yn"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入允许冲销!'},
      ];
    },
  },
  {
    label: '业务类型',
    field: 'bizType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_biz_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入业务类型!'},
      ];
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];


/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
