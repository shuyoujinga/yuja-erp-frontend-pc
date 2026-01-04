import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '出货单号',
    align:"center",
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
    align:"center",
    dataIndex: 'docTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '销售订单',
    align:"center",
    dataIndex: 'orderCodes'
   },
   {
    title: '运费类型',
    align:"center",
    dataIndex: 'freightType_dictText'
   },
  {
    title: '金额合计',
    align:"center",
    dataIndex: 'amount'
  },
   {
    title: '客户',
    align:"center",
    dataIndex: 'customerCode_dictText'
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
    title: '审批人',
    align:"center",
    dataIndex: "auditBy_dictText"
   },
   {
    title: '审批时间',
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
      label: "出货单号",
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
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '出货单号',
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
        {required: true, message: '请输入客户!'},
      ];
    },
  },

  {
    label: '销售订单',
    field: 'orderCodes',
    component: 'JPopup',
    componentProps: ({formActionType,formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_order",
        fieldConfig: [
          {source: 'doc_code', target: 'orderCodes'},
          {source: 'id', target: 'orderIds'},
          {source: 'detail_id', target: 'orderDetailIds'},
        ],
        multi: true,
        param: {customer_code: `'${formModel.customerCode}'`}
      }
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售订单!'},
      ];
    },
  },
  {
    label: '金额合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '运费类型',
    field: 'freightType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_freight_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择运费类型!'},
      ];
    }
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
  {
    label: '销售订单_IDS',
    field: 'orderIds',
    component: 'Input',
    show: false
  },{
    label: '销售订单明细_IDS',
    field: 'orderDetailIds',
    component: 'Input',
    show: false
  }

];
//子表单数据
//子表表格配置
export const salDeliveryDetailColumns: JVxeColumn[] = [
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
      title: '订单数',
      key: 'orderQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled: true
    },
    {
      title: '发货数',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"150px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{required: true, message: '${title}不能为空'} ,
        {
          handler({ cellValue, row }, callback) {
            const stockQty = Number(row.stockQty || 0)
            const shipQty = Number(cellValue || 0)

            // ① 库存为 0，直接禁止
            if (stockQty === 0) {
              row.amount = 0
              callback(false, '库存为0，不允许发货')
              return
            }

            // ② 发货数大于库存
            if (shipQty > stockQty) {
              row.amount = 0
              callback(false, '库存不足，不允许发货')
              return
            }

            // ③ 金额计算（通过校验后才算）
            const unitPrice = Number(row.unitPrice || 0)

            let discountRate = Number(row.discountRate)
            if (!discountRate || discountRate <= 0) {
              discountRate = 1
            }

            // === 四舍五入处理（保留 2 位小数）===
            const rawAmount = shipQty * unitPrice * discountRate
            row.amount = Math.round(rawAmount * 100) / 100

            callback(true)
          }
        }
      ],
    },
  {
    title: '件数',
    key: 'pieceQty',
    type: JVxeTypes.inputNumber,
    width:"100px",
    placeholder: '请输入${title}',
    defaultValue:'',
  },
    {
      title: '单价',
      key: 'unitPrice',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled: true
    },

    {
      title: '折扣',
      key: 'discountRate',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled: true
    },
    {
      title: '金额',
      key: 'amount',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled: true
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
  docCode: {title: '出货单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  orderCodes: {title: '销售订单',order: 2,view: 'text', type: 'string',},
  orderIds: {title: '销售订单_IDS',order: 3,view: 'text', type: 'string',},
  freightType: {title: '运费类型',order: 4,view: 'number', type: 'number',},
  customerCode: {title: '客户',order: 5,view: 'text', type: 'string',},
  status: {title: '状态',order: 6,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 7,view: 'number', type: 'number',},
  auditBy: {title: '审批人',order: 8,view: 'text', type: 'string',},
  auditTime: {title: '审批时间',order: 9,view: 'date', type: 'string',},
  remark: {title: '备注',order: 10,view: 'text', type: 'string',},
  //子表高级查询
  salDeliveryDetail: {
    title: '销售发货_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        orderDetailId: {title: '明细表ID',order: 1,view: 'text', type: 'string',},
        materialCode: {title: '货品',order: 2,view: 'text', type: 'string',},
        unit: {title: '单位',order: 3,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 4,view: 'text', type: 'string',},
        orderQty: {title: '订单数',order: 5,view: 'number', type: 'number',},
        qty: {title: '发货数',order: 6,view: 'number', type: 'number',},
        unitPrice: {title: '单价',order: 7,view: 'number', type: 'number',},
        pieceQty: {title: '件数',order: 8,view: 'number', type: 'number',},
        discountRate: {title: '折扣',order: 9,view: 'number', type: 'number',},
        amount: {title: '金额',order: 10,view: 'number', type: 'number',},
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
