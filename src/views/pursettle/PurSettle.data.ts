import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '结算单号',
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
    title: '供应商',
    align: "center",
    dataIndex: 'supplierCode_dictText'
  },
  {
    title: '收货单号',
    align: "center",
    dataIndex: 'receiveCodes'
  },
  {
    title: '预计付款日期',
    align: "center",
    dataIndex: 'payTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
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
    title: '金额合计',
    align: "center",
    dataIndex: 'amount'
  },
  {
    title: '差异金额合计',
    align: "center",
    dataIndex: 'differAmount'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "结算单号",
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
      dict: "yujiakeji_suppliers,name,code"
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '结算单号',
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
    defaultValue: new Date()
  },
  {
    label: '供应商',
    field: 'supplierCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentSupplier"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入供应商!'},
      ];
    },
  },
  {
    label: '采购收货_IDS',
    field: 'receiveIds',
    component: 'Input',
    show: false
  },
  {
    label: '采购收货明细_IDS',
    field: 'receiveDetailIds',
    component: 'Input',
    show: false
  },
  {
    label: '收货单号',
    field: 'receiveCodes',
    component: 'JPopup',
    componentProps: ({formActionType}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_pur_receive",
        fieldConfig: [
          {source: 'doc_code', target: 'receiveCodes'},
          {source: 'main_id', target: 'receiveIds'},
          {source: 'detail_id', target: 'receiveDetailIds'},
        ],
        multi: true,
        param: {supplier_code: "'supplier_code'"}
      }
    },

    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入收货单号!'},
      ];
    },
  },
  {
    label: '预计付款',
    field: 'payTime',
    component: 'DatePicker',
    componentProps: {
      style: {width: '100%'},
      valueFormat: 'YYYY-MM-DD',
    },

  },

  {
    label: '金额合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '差异金额',
    field: 'differAmount',
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
export const purSettleDetailColumns: JVxeColumn[] = [

  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode: "CurrentMaterial",
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
    disabled: true,
  },
  {
    title: '收货数量',
    key: 'receiveNum',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,

  },
  {
    title: '收货单价',
    key: 'receiveUnitPrice',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,

  },
  {
    title: '收货金额',
    key: 'receiveAmount',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '结算数量',
    key: 'settleNum',
    type: JVxeTypes.inputNumber,
    width: "120px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '结算单价',
    key: 'settleUnitPrice',
    type: JVxeTypes.inputNumber,
    width: "120px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '结算金额',
    key: 'settleAmount',
    type: JVxeTypes.inputNumber,
    width: "120px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
    disabled: true,
  },
  {
    title: '差异金额',
    key: 'settleDifferAmount',
    type: JVxeTypes.inputNumber,
    width: "120px",
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
  docCode: {title: '结算单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  supplierCode: {
    title: '供应商',
    order: 2,
    view: 'sel_search',
    type: 'string',
    dictTable: "yujiakeji_suppliers",
    dictCode: 'code',
    dictText: 'name',
  },
  receiveCodes: {
    title: '收货单号',
    order: 4,
    view: 'popup',
    type: 'string',
    code: '',
    orgFields: '',
    destFields: 'receiveCodes',
    popupMulti: false,
  },
  payTime: {title: '预计付款日期', order: 5, view: 'date', type: 'string',},
  status: {title: '状态', order: 6, view: 'number', type: 'number', dictCode: 'dict_pur_status',},
  audit: {
    title: '审核状态',
    order: 7,
    view: 'number',
    type: 'number',
    dictCode: 'dict_audit_status',
  },
  auditBy: {title: '审核人', order: 8, view: 'list', type: 'string',},
  auditTime: {title: '审核时间', order: 9, view: 'date', type: 'string',},
  amount: {title: '金额合计', order: 10, view: 'number', type: 'number',},
  differAmount: {title: '差异金额合计', order: 11, view: 'number', type: 'number',},
  //子表高级查询
  purSettleDetail: {
    title: '采购结算_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      materialCode: {title: '物料编码', order: 1, view: 'sel_search', type: 'string',},
      receiveNum: {title: '收货数量', order: 2, view: 'number', type: 'number',},
      receiveUnitPrice: {title: '收货单价', order: 3, view: 'number', type: 'number',},
      receiveAmount: {title: '收货金额', order: 4, view: 'number', type: 'number',},
      settleNum: {title: '结算数量', order: 5, view: 'number', type: 'number',},
      settleUnitPrice: {title: '结算单价', order: 6, view: 'number', type: 'number',},
      settleAmount: {title: '结算金额', order: 7, view: 'number', type: 'number',},
      settleDifferAmount: {title: '差异金额', order: 8, view: 'number', type: 'number',},
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
