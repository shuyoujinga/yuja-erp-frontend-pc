import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '业务单号',
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
    title: '要求交期',
    align:"center",
    dataIndex: 'requiredDeliveryTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '金额合计',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status'
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
    label: '业务单号',
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
    label: '要求交期',
    field: 'requiredDeliveryTime',
    component: 'DatePicker',
  },
  {
    label: '金额合计',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
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
export const salBizPlanDetailColumns: JVxeColumn[] = [
    {
      title: '主表ID',
      key: 'pid',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '订单明细ID',
      key: 'orderDetailId',
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
      title: '订单数',
      key: 'orderQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '计划数',
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
      title: 'BOM编码',
      key: 'bomCode',
      type: JVxeTypes.input,
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
export const salBizPlanBomDetailColumns: JVxeColumn[] = [
    {
      title: '主表ID',
      key: 'pid',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '标准BOM',
      key: 'bomCode',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '物料',
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
      title: '需求数',
      key: 'requiredQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '库存数',
      key: 'stockQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '在途数',
      key: 'inTransitQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '可用数',
      key: 'availableQty',
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
  docCode: {title: '业务单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  customerCode: {title: '客户',order: 2,view: 'text', type: 'string',},
  requiredDeliveryTime: {title: '要求交期',order: 3,view: 'date', type: 'string',},
  amount: {title: '金额合计',order: 4,view: 'number', type: 'number',},
  status: {title: '状态',order: 5,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 6,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 7,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 8,view: 'date', type: 'string',},
  remark: {title: '备注',order: 9,view: 'text', type: 'string',},
  //子表高级查询
  salBizPlanDetail: {
    title: '业务计划_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        orderDetailId: {title: '订单明细ID',order: 1,view: 'text', type: 'string',},
        materialCode: {title: '货品',order: 2,view: 'text', type: 'string',},
        unit: {title: '单位',order: 3,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 4,view: 'text', type: 'string',},
        orderQty: {title: '订单数',order: 5,view: 'number', type: 'number',},
        qty: {title: '计划数',order: 6,view: 'number', type: 'number',},
        unitPrice: {title: '单价',order: 7,view: 'number', type: 'number',},
        amount: {title: '金额',order: 8,view: 'number', type: 'number',},
        bomCode: {title: 'BOM编码',order: 9,view: 'text', type: 'string',},
        remark: {title: '备注',order: 10,view: 'text', type: 'string',},
    }
  },
  salBizPlanBomDetail: {
    title: '业务计划_材料明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        bomCode: {title: '标准BOM',order: 1,view: 'text', type: 'string',},
        materialCode: {title: '物料',order: 2,view: 'text', type: 'string',},
        unit: {title: '单位',order: 3,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 4,view: 'text', type: 'string',},
        requiredQty: {title: '需求数',order: 5,view: 'number', type: 'number',},
        stockQty: {title: '库存数',order: 6,view: 'number', type: 'number',},
        inTransitQty: {title: '在途数',order: 7,view: 'number', type: 'number',},
        availableQty: {title: '可用数',order: 8,view: 'number', type: 'number',},
        remark: {title: '备注',order: 9,view: 'text', type: 'string',},
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
