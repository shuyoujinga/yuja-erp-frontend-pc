import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {rules} from '/@/utils/helper/validator';
import {render} from '/@/utils/common/renderUtils';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '出库单号',
    align: "center",
    dataIndex: 'docCode',
    customRender: ({record}) => {
      return h('a', {
        style: {color: '#1890ff', cursor: 'pointer'},
        onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
      }, record.docCode,);
    }
  },
  {
    title: '制单日期',
    align: "center",
    dataIndex: 'docTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
  },
  {
    title: '出库类型',
    align: "center",
    dataIndex: 'outType_dictText'
  },
  {
    title: '仓库',
    align: "center",
    dataIndex: 'warehouseCode_dictText'
  },
  {
    title: '库区',
    align: "center",
    dataIndex: 'areaCode_dictText'
  },
  {
    title: '仓位',
    align: "center",
    dataIndex: 'locationCode'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'status_dictText'
  },
  {
    title: '审核状态',
    align: "center",
    dataIndex: 'audit_dictText'
  },
  {
    title: '审核人',
    align: "center",
    dataIndex: "auditBy_dictText"
  },
  {
    title: '审核时间',
    align: "center",
    dataIndex: 'auditTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
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
    label: '其他入库单号',
    field: 'docCode',
    component: 'JInput',
  },
  {
    label: "制单日期",
    field: "docTime",
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
    },

  }, {
    label: '出库类型',
    field: 'inType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_other_out_type"
    }
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '出库单号',
    field: 'docCode',
    component: 'Input',
    dynamicDisabled: true
  },
  {
    label: '制单日期',
    field: 'docTime',
    component: 'DatePicker',
    componentProps: {
      style: {width: '100%'},
      valueFormat: 'YYYY-MM-DD',
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入制单日期!'},
      ];
    },
    defaultValue: new Date()
  },
  {
    label: '出库类型',
    field: 'outType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_other_out_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择出库类型!'},
      ];
    }
  },
  {
    label: '仓库',
    field: 'warehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择仓库!'},
      ];
    }
  },
  {
    label: '库区',
    field: 'areaCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: 'inv_stock,location_code,location_code,location_code is not null',
    },
  },
  {
    label: '仓位',
    field: 'locationCode',
    component: 'Input',
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
export const invMiscOutDetailColumns: JVxeColumn[] = [
  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentStockMaterial',
    options: [],
    width: '350px',
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
    title: '库存数量',
    key: 'stockQty',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '数量',
    key: 'qty',
    type: JVxeTypes.inputNumber,
    width: "100px",
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
  docCode: {title: '出库单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  outType: {title: '出库类型', order: 2, view: 'number', type: 'number',},
  warehouseCode: {title: '仓库', order: 3, view: 'text', type: 'string',},
  areaCode: {title: '库区', order: 4, view: 'text', type: 'string',},
  locationCode: {title: '仓位', order: 5, view: 'text', type: 'string',},
  status: {title: '状态', order: 6, view: 'number', type: 'number',},
  audit: {title: '审核状态', order: 7, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 8, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 9, view: 'date', type: 'string',},
  remark: {title: '备注', order: 10, view: 'text', type: 'string',},
  //子表高级查询
  invMiscOutDetail: {
    title: '其他入库_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      materialCode: {title: '物料', order: 1, view: 'text', type: 'string',},
      unit: {title: '单位', order: 2, view: 'text', type: 'string',},
      specificcations: {title: '规格', order: 3, view: 'text', type: 'string',},
      qty: {title: '数量', order: 4, view: 'number', type: 'number',},
      remark: {title: '备注', order: 5, view: 'text', type: 'string',},
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
