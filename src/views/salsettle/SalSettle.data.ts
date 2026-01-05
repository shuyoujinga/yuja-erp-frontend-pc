import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '结算单号',
    align:"center",
    dataIndex: 'docCode' ,
     customRender: ({record}) => {
       return h('a', {
         style: {color: '#1890ff', cursor: 'pointer'},
         onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
       }, record.docCode,);
     }
   },
   {
    title: '制单日期',
    align:"center",
    dataIndex: 'docTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '客户',
    align:"center",
    dataIndex: 'customerCode_dictText'
   },

   {
    title: '发货单号',
    align:"center",
    dataIndex: 'deliveryCodes'
   },
   {
    title: '退货单号',
    align:"center",
    dataIndex: 'returnCodes'
   },
   {
    title: '发货合计',
    align:"center",
    dataIndex: 'deliveryAmount'
   },

  {
    title: '退货冲抵',
    align:"center",
    dataIndex: 'returnAmount'
  },

   {
    title: '结算合计',
    align:"center",
    dataIndex: 'amount'
   },
  {
    title: '状态',
    align:"center",
    dataIndex: 'status_dictText'
  },
  {
    title: '审核状态',
    align:"center",
    dataIndex: 'audit_dictText'
  },
  {
    title: '审核人',
    align:"center",
    dataIndex: "auditBy_dictText"
  },
  {
    title: '审核时间',
    align:"center",
    dataIndex: 'auditTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
  },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "结算单号",
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
    label: '结算单号',
    field: 'docCode',
    component: 'Input',
    dynamicDisabled:true
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
    defaultValue: new Date()},
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
    label: '发货单号',
    field: 'deliveryCodes',
    component: 'JPopup',
    componentProps: ({formActionType,formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_delivery",
        fieldConfig: [
          {source: 'doc_code', target: 'deliveryCodes'},
          {source: 'id', target: 'deliveryIds'},
          {source: 'detail_id', target: 'deliveryDetailIds'},
          {source: 'detail_amount', target: 'deliveryAmountDetail'},
        ],
        multi: true,
        param: {customer_code: `'${formModel.customerCode}'`}
      }
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售订单!'},
      ];
    }
  },

  {
    label: '退货单号',
    field: 'returnCodes',
    component: 'JPopup',
    componentProps: ({formActionType,formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_return",
        fieldConfig: [
          {source: 'doc_code', target: 'returnCodes'},
          {source: 'id', target: 'returnIds'},
          {source: 'detail_id', target: 'returnDetailIds'},
          {source: 'detail_amount', target: 'returnAmountDetail'},
        ],
        multi: true,
        param: {customer_code: `'${formModel.customerCode}'`}
      }
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售订单!'},
      ];
    }
  },

  {
    label: '发货合计',
    field: 'deliveryAmount',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '退货冲抵',
    field: 'returnAmount',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '结算合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: '退货单号_IDS',
    field: 'returnIds',
    component: 'Input',
    show: false
  },
  {
    label: '退货单号明细_IDS',
    field: 'returnDetailIds',
    component: 'Input',
    show: false
  },
  {
    label: '退货金额',
    field: 'returnAmountDetail',
    component: 'Input',
    show: false
  },
  {
    label: '发货金额',
    field: 'deliveryAmountDetail',
    component: 'Input',
    show: false
  },
  {
    label: '发货单号明细_IDS',
    field: 'deliveryDetailIds',
    component: 'Input',
    show: false
  },
  {
    label: '发货单号_IDS',
    field: 'deliveryIds',
    component: 'Input',
    show: false
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
export const salSettleDetailColumns: JVxeColumn[] = [
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
      title: '单价',
      key: 'unitPrice',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
    },
    {
      title: '发货数',
      key: 'deliveryQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
    },
    {
      title: '发货金额',
      key: 'deliveryAmount',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
    },
    {
      title: '结算数',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"150px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{required: true, message: '${title}不能为空'},{
        handler({ cellValue, row }, callback) {
          const deliveryQty = Number(row.deliveryQty || 0)
          const unitPrice = Number(row.unitPrice || 0)
          const shipQty = Number(cellValue || 0)
          // ② 发货数大于库存
          if (shipQty > deliveryQty) {
            row.amount = 0
            callback(false, '结算数不可超过发货数!')
            return
          }
          // === 四舍五入处理（保留 2 位小数）===
          const rawAmount = shipQty * unitPrice
          row.amount = Math.round(rawAmount * 100) / 100

          callback(true)
        }
      }],
    },
    {
      title: '结算金额',
      key: 'amount',
      type: JVxeTypes.inputNumber,
      width:"150px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{required: true, message: '${title}不能为空'}],
      disabled:true,
    },
    {
      title: '备注',
      key: 'remark',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  ]


// 高级查询数据
export const superQuerySchema = {
  docCode: {title: '结算单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  customerCode: {title: '客户',order: 2,view: 'text', type: 'string',},
  deliveryIds: {title: '发货单号_IDS',order: 3,view: 'text', type: 'string',},
  deliveryCodes: {title: '发货单号',order: 4,view: 'text', type: 'string',},
  returnIds: {title: '退货单号_IDS',order: 5,view: 'text', type: 'string',},
  returnCodes: {title: '退货单号',order: 6,view: 'text', type: 'string',},
  audit: {title: '审核状态',order: 7,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 8,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 9,view: 'date', type: 'string',},
  status: {title: '状态',order: 10,view: 'number', type: 'number',},
  deliveryAmount: {title: '发货合计',order: 11,view: 'number', type: 'number',},
  returnAmount: {title: '退货冲抵',order: 12,view: 'number', type: 'number',},
  amount: {title: '结算合计',order: 13,view: 'number', type: 'number',},
  remark: {title: '备注',order: 14,view: 'text', type: 'string',},
  //子表高级查询
  salSettleDetail: {
    title: '销售结算_明细',
    view: 'table',
    fields: {
        pid: {title: '主编ID',order: 0,view: 'text', type: 'string',},
        deliveryDetailId: {title: '结算明细ID',order: 1,view: 'text', type: 'string',},
        returnDetailId: {title: '退货明细ID',order: 2,view: 'text', type: 'string',},
        materialCode: {title: '货品',order: 3,view: 'text', type: 'string',},
        unit: {title: '单位',order: 4,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 5,view: 'text', type: 'string',},
        unitPrice: {title: '单价',order: 6,view: 'number', type: 'number',},
        deliveryQty: {title: '发货数',order: 7,view: 'number', type: 'number',},
        deliveryAmount: {title: '发货金额',order: 8,view: 'number', type: 'number',},
        qty: {title: '结算数',order: 9,view: 'number', type: 'number',},
        amount: {title: '结算金额',order: 10,view: 'number', type: 'number',},
        remark: {title: '备注',order: 11,view: 'text', type: 'string',},
    }
  },
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
// 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
