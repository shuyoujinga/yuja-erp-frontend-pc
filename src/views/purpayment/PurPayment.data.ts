import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '付款单号',
    align: "center",
    dataIndex: 'docCode',
    customRender: ({record}) => {
      return h(
        'a',
        {
          style: {color: '#1890ff', cursor: 'pointer'},
          onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
        },
        record.docCode,
      );
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
    title: '结算单号',
    align: "center",
    dataIndex: 'settleCodes'
  },
  {
    title: '供应商',
    align: "center",
    dataIndex: 'supplierCode_dictText'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'status_dictText'
  },

  {
    title: '金额合计',
    align: "center",
    dataIndex: 'amount'
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
    label: "付款单号",
    field: "docCode",
    component: 'Input',
    //colProps: {span: 6},
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
    label: "供应商",
    field: "supplierCode",
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentSupplier"
    },
    //colProps: {span: 6},
  },
  {
    label: "结算单号",
    field: "settleCodes",
    component: 'Input',
    //colProps: {span: 6},
  },

  {
    label: "审核状态",
    field: "audit",
    component: 'JDictSelectTag',
    componentProps: {},
    //colProps: {span: 6},
  },
  {
    label: "状态",
    field: "status",
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "dict_pur_status"
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '付款单号',
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
    defaultValue: new Date(),
  },
  {
    label: '结算单号',
    field: 'settleCodes',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '结算_IDS',
    field: 'settleIds',
    component: 'Input',
    show: false
  },
  {
    label: '供应商',
    field: 'supplierCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentSupplier"
    },
    dynamicDisabled: true
  },

  {
    label: '金额合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
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
export const purPaymentDetailColumns: JVxeColumn[] = [
  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    width: "350px",
    dictCode:"CurrentMaterial",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
    validateRules: [
      {required: true, message: '${title}不能为空'},
    ],
  },
  {
    title: '结算数量',
    key: 'settleNum',
    type: JVxeTypes.input,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '结算单价',
    key: 'settleUnitPrice',
    type: JVxeTypes.input,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '结算金额',
    key: 'settleAmount',
    type: JVxeTypes.input,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '付款金额',
    key: 'amount',
    type: JVxeTypes.input,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
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
  docCode: {title: '付款单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  settleCodes: {title: '结算单号', order: 2, view: 'text', type: 'string',},
  supplierCode: {
    title: '供应商',
    order: 4,
    view: 'sel_search',
    type: 'string',
    dictTable: "yujiakeji_suppliers",
    dictCode: 'code',
    dictText: 'name',
  },
  remark: {title: '备注', order: 5, view: 'text', type: 'string',},
  audit: {title: '审核状态', order: 6, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 7, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 8, view: 'date', type: 'string',},
  amount: {title: '金额合计', order: 9, view: 'number', type: 'number',},
  status: {title: '状态', order: 10, view: 'number', type: 'number', dictCode: 'dict_pur_status',},
  //子表高级查询
  purPaymentDetail: {
    title: '采购付款_明细',
    view: 'table',
    fields: {
      settleDetailId: {title: '采购结算明细_ID', order: 0, view: 'text', type: 'string',},
      materialCode: {title: '物料', order: 1, view: 'text', type: 'string',},
      settleNum: {title: '结算数量', order: 2, view: 'text', type: 'string',},
      settleUnitPrice: {title: '结算单价', order: 3, view: 'text', type: 'string',},
      settleAmount: {title: '结算金额', order: 4, view: 'text', type: 'string',},
      amount: {title: '付款金额', order: 5, view: 'text', type: 'string',},
      remark: {title: '备注', order: 6, view: 'text', type: 'string',},
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
