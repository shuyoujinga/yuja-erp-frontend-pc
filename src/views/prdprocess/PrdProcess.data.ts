import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {rules} from '/@/utils/helper/validator';
import {render} from '/@/utils/common/renderUtils';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '货品编码',
    align: "center",
    dataIndex: 'materialCode',
  customRender: ({record}) => {
  return h(
    'a',
    {
      style: {color: '#1890ff', cursor: 'pointer'},
      onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
    },
    record.materialCode,
  );
}
  },
  {
    title: '货品名称',
    align: "center",
    dataIndex: 'materialCode_dictText'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'unit_dictText'
  },
  {
    title: '规格',
    align: "center",
    dataIndex: 'specifications'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '货品',
    field: 'materialCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentProductionMaterial",
    },

  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '货品',
    field: 'materialCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentMaterial",
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择货品!'},
      ];
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_materials_unit",
    },
    dynamicDisabled: true
  },
  {
    label: '规格',
    field: 'specifications',
    component: 'Input',
    dynamicDisabled: true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];
//子表单数据
//子表表格配置
export const prdProcessDetailColumns: JVxeColumn[] = [
  {
    title: '工序类型',
    key: 'processType',
    type: JVxeTypes.selectSearch,
    dictCode: 'dict_process_type',
    options: [],
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '工序',
    key: 'processCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'dict_process_code',
    options: [],
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },

  {
    title: '目标物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentMaterial',
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.selectSearch,
    dictCode: "dict_materials_unit",
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '规格',
    key: 'specifications',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '工序单价',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '备注',
    key: 'remark',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
  },
]


// 高级查询数据
export const superQuerySchema = {
  materialCode: {title: '货品', order: 0, view: 'text', type: 'string',},
  unit: {title: '单位', order: 1, view: 'text', type: 'string',},
  specifications: {title: '规格', order: 2, view: 'number', type: 'number',},
  remark: {title: '备注', order: 3, view: 'text', type: 'string',},
  //子表高级查询
  prdProcessDetail: {
    title: '生产工序_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      processType: {title: '工序类型', order: 1, view: 'text', type: 'string',},
      processCode: {title: '工序编码', order: 2, view: 'text', type: 'string',},
      processName: {title: '工序名称', order: 3, view: 'text', type: 'string',},
      materialCode: {title: '目标物料', order: 4, view: 'text', type: 'string',},
      unit: {title: '单位', order: 5, view: 'text', type: 'string',},
      specifications: {title: '规格', order: 6, view: 'text', type: 'string',},
      unitPrice: {title: '工序单价', order: 7, view: 'text', type: 'string',},
      remark: {title: '备注', order: 8, view: 'text', type: 'string',},
    }
  },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
// 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
