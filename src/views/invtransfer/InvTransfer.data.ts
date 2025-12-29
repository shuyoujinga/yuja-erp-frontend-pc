import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '调拨单号',
    align: "center",
    dataIndex: 'docCode',
    customRender: ({ record }) => {
      return h('a', {
        style: { color: '#1890ff', cursor: 'pointer' },
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
    title: '所属部门',
    align: "center",
    dataIndex: 'sysOrgCode_dictText'
  },
  {
    title: '调出仓',
    align: "center",
    dataIndex: 'fromWarehouseCode_dictText'
  },
  {
    title: '调入仓',
    align: "center",
    dataIndex: 'toWarehouseCode_dictText'
  },
  {
    title: '引用单号',
    align: "center",
    dataIndex: 'refCode'
  },

  {
    title: '审核状态',
    align: "center",
    dataIndex: 'audit_dictText'
  },
  {
    title: '审核人',
    align: "center",
    dataIndex: 'auditBy_dictText'
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
    label: '调拨单号',
    field: 'docCode',
    component: 'JInput',

  },
  {
    label: '调出仓',
    field: 'fromWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
  },
  {
    label: '调入仓',
    field: 'toWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '调拨单号',
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
    dynamicRules: () => [
      {required: true, message: '请选择制单日期!'},
    ],
    defaultValue: new Date(),
  },
  {
    label: '调出仓',
    field: 'fromWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
    required: true
  },
  {
    label: '调入仓',
    field: 'toWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
    required: true
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },

  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];
//子表单数据
//子表表格配置
export const invTransferDetailColumns: JVxeColumn[] = [
  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode:'CurrentStockMaterial',
    options:[],
    width: '350px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.selectSearch,
    dictCode:"dict_materials_unit",
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

  },
  {
    title: '库存数量',
    key: 'stockQty',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '数量',
    key: 'qty',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '单价',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '金额',
    key: 'amount',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
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
  docCode: {title: '调拨单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  fromWarehouseCode: {title: '调出仓', order: 2, view: 'text', type: 'string',},
  toWarehouseCode: {title: '调入仓', order: 3, view: 'text', type: 'string',},
  audit: {title: '审核状态', order: 4, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 5, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 6, view: 'date', type: 'string',},
  status: {title: '状态', order: 7, view: 'number', type: 'number',},
  remark: {title: '备注', order: 8, view: 'text', type: 'string',},
  refId: {title: '引用ID', order: 9, view: 'text', type: 'string',},
  refCode: {title: '引用单号', order: 10, view: 'text', type: 'string',},
  //子表高级查询
  invTransferDetail: {
    title: '物料调拨_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      refDetailId: {title: '引用明细ID', order: 1, view: 'text', type: 'string',},
      materialCode: {title: '物料', order: 2, view: 'text', type: 'string',},
      unit: {title: '单位', order: 3, view: 'text', type: 'string',},
      specifications: {title: '规格', order: 4, view: 'text', type: 'string',},
      qty: {title: '数量', order: 5, view: 'number', type: 'number',},
      unitPrice: {title: '单价', order: 6, view: 'number', type: 'number',},
      amount: {title: '金额', order: 7, view: 'number', type: 'number',},
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
