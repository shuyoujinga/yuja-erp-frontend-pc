import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '结算单号',
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
    title: '发货单号_IDS',
    align:"center",
    dataIndex: 'deliveryIds'
   },
   {
    title: '发货单号',
    align:"center",
    dataIndex: 'deliveryCodes'
   },
   {
    title: '退货单号_IDS',
    align:"center",
    dataIndex: 'returnIds'
   },
   {
    title: '退货单号',
    align:"center",
    dataIndex: 'returnCodes'
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
    title: '结算合计',
    align:"center",
    dataIndex: 'settleAmount'
   },
   {
    title: '退货冲抵',
    align:"center",
    dataIndex: 'returnAmount'
   },
   {
    title: '金额合计',
    align:"center",
    dataIndex: 'amount'
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
    label: '结算单号',
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
    label: '发货单号_IDS',
    field: 'deliveryIds',
    component: 'Input',
  },
  {
    label: '发货单号',
    field: 'deliveryCodes',
    component: 'Input',
  },
  {
    label: '退货单号_IDS',
    field: 'returnIds',
    component: 'Input',
  },
  {
    label: '退货单号',
    field: 'returnCodes',
    component: 'Input',
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
    label: '结算合计',
    field: 'settleAmount',
    component: 'InputNumber',
  },
  {
    label: '退货冲抵',
    field: 'returnAmount',
    component: 'InputNumber',
  },
  {
    label: '金额合计',
    field: 'amount',
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
export const salSettleDetailColumns: JVxeColumn[] = [
    {
      title: '主编ID',
      key: 'pid',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '结算明细ID',
      key: 'deliveryDetailId',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '退货明细ID',
      key: 'returnDetailId',
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
      title: '单价',
      key: 'unitPrice',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '发货数',
      key: 'deliveryQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '发货金额',
      key: 'deliveryAmount',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '结算数',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '结算金额',
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
  settleAmount: {title: '结算合计',order: 11,view: 'number', type: 'number',},
  returnAmount: {title: '退货冲抵',order: 12,view: 'number', type: 'number',},
  amount: {title: '金额合计',order: 13,view: 'number', type: 'number',},
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
