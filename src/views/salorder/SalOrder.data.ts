import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {rules} from '/@/utils/helper/validator';
import {render} from '/@/utils/common/renderUtils';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '销售订单',
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
    title: '客户',
    align: "center",
    dataIndex: 'customerCode_dictText'
  },
  {
    title: '金额合计',
    align: "center",
    dataIndex: 'amount'
  },
  {
    title: '是否含税',
    align: "center",
    dataIndex: 'isTax_dictText'
  },
  {
    title: '要求交期',
    align: "center",
    dataIndex: 'requiredDeliveryTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
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
    label: "销售订单",
    field: "docCode",
    component: 'JInput',
  },
  {
    label: "制单日期",
    field: "docTime",
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
    },
    //colProps: {span: 6},
  },
  {
    label: "客户",
    field: "customerCode",
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentCustomer"
    }
  },
  {
    label: "要求交期",
    field: "requiredDeliveryTime",
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date',
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '销售订单',
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
    label: '客户',
    field: 'customerCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentCustomer"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入客户!'},
      ];
    },
  },
  {
    label: '销售报价',
    field: 'salQuoteDocCodes',
    component: 'JPopup',
    componentProps: ({formActionType}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_quote",
        fieldConfig: [
          {source: 'doc_code', target: 'salDocCodes'},
          {source: 'id', target: 'salQuoteIds'},
          {source: 'detail_id', target: 'salQuoteDetailIds'},
        ],
        multi: true,
        param: {}
      }
    },

    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售报价单!'},
      ];
    },
  },
  {
    label: '是否含税',
    field: 'isTax',
    component: 'JSearchSelect',
    componentProps:{
      dict: "yn"
    },
    defaultValue: 1,
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择是否含税!'},
      ];
    }
  },
  {
    label: '金额合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '要求交期',
    field: 'requiredDeliveryTime',
    component: 'DatePicker',
    componentProps: {
      style: {width: '100%'},
      valueFormat: 'YYYY-MM-DD',
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入要求交期!'},
      ];
    },
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: '',
    field: 'salQuoteIds',
    component: 'Input',
    show: false
  },
  {
    label: '',
    field: 'salQuoteDetailIds',
    component: 'Input',
    show: false
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
export const salOrderDetailColumns: JVxeColumn[] = [
  {
    title: '货品',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode:'CurrentProduction',
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled:true,
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.selectSearch,
    options: [],
    dictCode: "dict_materials_unit",
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '规格',
    key: 'specifications',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '库存数量',
    key: 'stockQty',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
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
    title: '件数',
    key: 'pieceQty',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '折扣',
    key: 'discountRate',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '单价',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
    disabled: true
  },
  {
    title: '金额',
    key: 'amount',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
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
  docCode: {title: '销售订单', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  customerCode: {title: '客户', order: 2, view: 'text', type: 'string',},
  requiredDeliveryTime: {title: '要求交期', order: 3, view: 'date', type: 'string',},
  audit: {title: '审核状态', order: 4, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 5, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 6, view: 'date', type: 'string',},
  remark: {title: '备注', order: 7, view: 'text', type: 'string',},
  amount: {title: '金额合计', order: 8, view: 'number', type: 'number',},
  //子表高级查询
  salOrderDetail: {
    title: '销售订单_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      quoteDetailId: {title: '报价明细_ID', order: 1, view: 'text', type: 'string',},
      materialCode: {title: '货品', order: 2, view: 'text', type: 'string',},
      unit: {title: '单位', order: 3, view: 'text', type: 'string',},
      specificaitons: {title: '规格', order: 4, view: 'text', type: 'string',},
      qty: {title: '数量', order: 5, view: 'text', type: 'string',},
      unitPrice: {title: '单价', order: 6, view: 'number', type: 'number',},
      discountRate: {title: '折扣', order: 7, view: 'number', type: 'number',},
      pieceQty: {title: '件数', order: 8, view: 'number', type: 'number',},
      amount: {title: '金额', order: 9, view: 'number', type: 'number',},
      remark: {title: '备注', order: 10, view: 'text', type: 'string',},
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
