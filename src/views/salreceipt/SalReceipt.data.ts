import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '收款单号',
    align:"center",
    dataIndex: 'docCode'
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
    dataIndex: 'customerCode'
   },
   {
    title: '结算IDS',
    align:"center",
    dataIndex: 'settleIds'
   },
   {
    title: '结算单号',
    align:"center",
    dataIndex: 'settleCodes'
   },
   {
    title: '预收ID',
    align:"center",
    dataIndex: 'prepayId'
   },
   {
    title: '预收单',
    align:"center",
    dataIndex: 'prepayCode'
   },
   {
    title: '收款方式',
    align:"center",
    dataIndex: 'receiptType'
   },
   {
    title: '结算金额',
    align:"center",
    dataIndex: 'settleAmount'
   },
   {
    title: '预收抵扣',
    align:"center",
    dataIndex: 'prepay'
   },
   {
    title: '实收合计',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '审核状态',
    align:"center",
    dataIndex: 'audit'
   },
   {
    title: '审核人',
    align:"center",
    dataIndex: 'auditBy'
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
    title: '状态',
    align:"center",
    dataIndex: 'status'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '收款单号',
         field: 'docCode',
    component: 'Input',dynamicDisabled:true 
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
    component: 'Input',
  },
  {
    label: '结算IDS',
    field: 'settleIds',
    component: 'Input',
  },
  {
    label: '结算单号',
    field: 'settleCodes',
    component: 'Input',
  },
  {
    label: '预收ID',
    field: 'prepayId',
    component: 'Input',
  },
  {
    label: '预收单',
    field: 'prepayCode',
    component: 'Input',
  },
  {
    label: '收款方式',
    field: 'receiptType',
    component: 'InputNumber',
  },
  {
    label: '结算金额',
    field: 'settleAmount',
    component: 'InputNumber',
  },
  {
    label: '预收抵扣',
    field: 'prepay',
    component: 'InputNumber',
  },
  {
    label: '实收合计',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: '审核状态',
    field: 'audit',
    component: 'InputNumber',
  },
  {
    label: '审核人',
    field: 'auditBy',
    component: 'Input',
  },
  {
    label: '审核时间',
    field: 'auditTime',
    component: 'DatePicker',
  },
  {
    label: '状态',
    field: 'status',
    component: 'InputNumber',
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
export const salReceiptDetailColumns: JVxeColumn[] = [
    {
      title: '主表ID',
      key: 'pid',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '结算明细ID',
      key: 'settleDetailId',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '货品',
      key: 'materialCode',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '单位',
      key: 'unit',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '规格',
      key: 'specifications',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '数量',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '单价',
      key: 'unitPrice',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '金额',
      key: 'amount',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
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
  docCode: {title: '收款单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  customerCode: {title: '客户',order: 2,view: 'text', type: 'string',},
  settleIds: {title: '结算IDS',order: 3,view: 'text', type: 'string',},
  settleCodes: {title: '结算单号',order: 4,view: 'text', type: 'string',},
  prepayId: {title: '预收ID',order: 5,view: 'text', type: 'string',},
  prepayCode: {title: '预收单',order: 6,view: 'text', type: 'string',},
  receiptType: {title: '收款方式',order: 7,view: 'number', type: 'number',},
  settleAmount: {title: '结算金额',order: 8,view: 'number', type: 'number',},
  prepay: {title: '预收抵扣',order: 9,view: 'number', type: 'number',},
  amount: {title: '实收合计',order: 10,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 11,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 12,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 13,view: 'date', type: 'string',},
  status: {title: '状态',order: 14,view: 'number', type: 'number',},
  remark: {title: '备注',order: 15,view: 'text', type: 'string',},
  //子表高级查询
  salReceiptDetail: {
    title: '销售收款_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        settleDetailId: {title: '结算明细ID',order: 1,view: 'text', type: 'string',},
        materialCode: {title: '货品',order: 2,view: 'text', type: 'string',},
        unit: {title: '单位',order: 3,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 4,view: 'text', type: 'string',},
        qty: {title: '数量',order: 5,view: 'number', type: 'number',},
        unitPrice: {title: '单价',order: 6,view: 'number', type: 'number',},
        amount: {title: '金额',order: 7,view: 'number', type: 'number',},
        remark: {title: '备注',order: 8,view: 'text', type: 'string',},
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
