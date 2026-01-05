import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {rules} from '/@/utils/helper/validator';
import {render} from '/@/utils/common/renderUtils';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '收款单号',
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
    title: '结算单号',
    align: "center",
    dataIndex: 'settleCodes'
  },
  {
    title: '预收单号',
    align: "center",
    dataIndex: 'prepayCodes'
  },
  {
    title: '收款方式',
    align: "center",
    dataIndex: 'receiptType_dictText'
  },
  {
    title: '结算金额',
    align: "center",
    dataIndex: 'settleAmount'
  },
  {
    title: '预收抵扣',
    align: "center",
    dataIndex: 'prepayAmount'
  },
  {
    title: '实收合计',
    align: "center",
    dataIndex: 'amount'
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
    label: "收款单号",
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
  },
  {
    label: "客户",
    field: "customerCode",
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentCustomer"
    }
  }

];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '收款单号',
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
        {required: true, message: '请选择客户!'},
      ];
    }
  },
  {
    label: '收款方式',
    field: 'receiptType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_receipt_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择收款方式!'},
      ];
    }
  },
  {
    label: '结算单号',
    field: 'settleCodes',
    component: 'JPopup',
    componentProps: ({formActionType,formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_settle",
        fieldConfig: [
          {source: 'doc_code', target: 'settleCodes'},
          {source: 'id', target: 'settleIds'},
          {source: 'detail_id', target: 'settleDetailIds'},
          {source: 'detail_amount', target: 'settleAmountDetail'},
        ],
        multi: true,
        param: {customer_code: `'${formModel.customerCode}'`}
      }
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售结算单!'},
      ];
    }
  },
  {
    label: '预收单号',
    field: 'prepayCodes',
    component: 'JPopup',
    componentProps: ({formActionType,formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_prepay",
        fieldConfig: [
          {source: 'doc_code', target: 'prepayCodes'},
          {source: 'id', target: 'prepayIds'},
          {source: 'amount', target: 'prepayAmountDetail'},
        ],
        multi: true,
        param: {customer_code: `'${formModel.customerCode}'`}
      }
    },

  },

  {
    label: '结算金额',
    field: 'settleAmount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '预收抵扣',
    field: 'prepayAmount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '实收合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled: true
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '结算明细金额',
    field: 'settleAmountDetail',
    component: 'Input',
    show: false
  },
  {
    label: '预收明细金额',
    field: 'prepayAmountDetail',
    component: 'Input',
    show: false
  },
  {
    label: '结算IDS',
    field: 'settleIds',
    component: 'Input',
    show: false
  },
  {
    label: '结算明细IDS',
    field: 'settleDetailIds',
    component: 'Input',
    show: false
  },
  {
    label: '预收ID',
    field: 'prepayIds',
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
export const salReceiptDetailColumns: JVxeColumn[] = [
  {
    title: '货品',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentProduction',
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
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
    title: '数量',
    key: 'qty',
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
  docCode: {title: '收款单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  customerCode: {title: '客户', order: 2, view: 'text', type: 'string',},
  settleIds: {title: '结算IDS', order: 3, view: 'text', type: 'string',},
  settleCodes: {title: '结算单号', order: 4, view: 'text', type: 'string',},
  prepayId: {title: '预收ID', order: 5, view: 'text', type: 'string',},
  prepayCode: {title: '预收单', order: 6, view: 'text', type: 'string',},
  receiptType: {title: '收款方式', order: 7, view: 'number', type: 'number',},
  settleAmount: {title: '结算金额', order: 8, view: 'number', type: 'number',},
  prepayAmount: {title: '预收抵扣', order: 9, view: 'number', type: 'number',},
  amount: {title: '实收合计', order: 10, view: 'number', type: 'number',},
  audit: {title: '审核状态', order: 11, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 12, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 13, view: 'date', type: 'string',},
  status: {title: '状态', order: 14, view: 'number', type: 'number',},
  remark: {title: '备注', order: 15, view: 'text', type: 'string',},
  //子表高级查询
  salReceiptDetail: {
    title: '销售收款_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      settleDetailId: {title: '结算明细ID', order: 1, view: 'text', type: 'string',},
      materialCode: {title: '货品', order: 2, view: 'text', type: 'string',},
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
