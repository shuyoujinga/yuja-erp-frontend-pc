import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '报工单号',
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
    title: '生产工单_IDS',
    align:"center",
    dataIndex: 'workOrderIds'
   },
   {
    title: '生产工单',
    align:"center",
    dataIndex: 'workOrderCodes'
   },
   {
    title: '生产产品',
    align:"center",
    dataIndex: 'materialCode'
   },
   {
    title: '产线',
    align:"center",
    dataIndex: 'prdLine'
   },
   {
    title: '工单数量',
    align:"center",
    dataIndex: 'orderQty'
   },
   {
    title: '完成数',
    align:"center",
    dataIndex: 'qty'
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
    label: '报工单号',
    field: 'docCode',
    component: 'Input',
  },
  {
    label: '制单日期',
    field: 'docTime',
    component: 'DatePicker',
  },
  {
    label: '生产工单_IDS',
    field: 'workOrderIds',
    component: 'Input',
  },
  {
    label: '生产工单',
    field: 'workOrderCodes',
    component: 'Input',
  },
  {
    label: '生产产品',
    field: 'materialCode',
    component: 'Input',
  },
  {
    label: '产线',
    field: 'prdLine',
    component: 'Input',
  },
  {
    label: '工单数量',
    field: 'orderQty',
    component: 'InputNumber',
  },
  {
    label: '完成数',
    field: 'qty',
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
export const prdReportDetailColumns: JVxeColumn[] = [
    {
      title: '主表ID',
      key: 'pid',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '员工工号',
      key: 'employeeId',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '员工姓名',
      key: 'employeeName',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '用工类型',
      key: 'workType',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '评分',
      key: 'score',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '员工工资',
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
  docCode: {title: '报工单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  workOrderIds: {title: '生产工单_IDS',order: 2,view: 'text', type: 'string',},
  workOrderCodes: {title: '生产工单',order: 3,view: 'text', type: 'string',},
  materialCode: {title: '生产产品',order: 4,view: 'text', type: 'string',},
  prdLine: {title: '产线',order: 5,view: 'text', type: 'string',},
  orderQty: {title: '工单数量',order: 6,view: 'number', type: 'number',},
  qty: {title: '完成数',order: 7,view: 'number', type: 'number',},
  status: {title: '状态',order: 8,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 9,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 10,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 11,view: 'date', type: 'string',},
  remark: {title: '备注',order: 12,view: 'text', type: 'string',},
  //子表高级查询
  prdReportDetail: {
    title: '生产报工_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        employeeId: {title: '员工工号',order: 1,view: 'text', type: 'string',},
        employeeName: {title: '员工姓名',order: 2,view: 'text', type: 'string',},
        workType: {title: '用工类型',order: 3,view: 'number', type: 'number',},
        score: {title: '评分',order: 4,view: 'number', type: 'number',},
        amount: {title: '员工工资',order: 5,view: 'number', type: 'number',},
        remark: {title: '备注',order: 6,view: 'text', type: 'string',},
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