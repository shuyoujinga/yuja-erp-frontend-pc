import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '退料单号',
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
    dataIndex: 'wordOrderIds'
   },
   {
    title: '生产工单',
    align:"center",
    dataIndex: 'wordOrderCodes'
   },
   {
    title: '生产产品',
    align:"center",
    dataIndex: 'materialCode'
   },
   {
    title: '生产数量',
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
    label: '退料单号',
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
    field: 'wordOrderIds',
    component: 'Input',
  },
  {
    label: '生产工单',
    field: 'wordOrderCodes',
    component: 'Input',
  },
  {
    label: '生产产品',
    field: 'materialCode',
    component: 'Input',
  },
  {
    label: '生产数量',
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
export const prdReturnDetailColumns: JVxeColumn[] = [
    {
      title: '主表ID',
      key: 'pid',
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
      title: '领用数',
      key: 'issueQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '退料数',
      key: 'qty',
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
  docCode: {title: '退料单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  wordOrderIds: {title: '生产工单_IDS',order: 2,view: 'text', type: 'string',},
  wordOrderCodes: {title: '生产工单',order: 3,view: 'text', type: 'string',},
  materialCode: {title: '生产产品',order: 4,view: 'text', type: 'string',},
  qty: {title: '生产数量',order: 5,view: 'number', type: 'number',},
  status: {title: '状态',order: 6,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 7,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 8,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 9,view: 'date', type: 'string',},
  remark: {title: '备注',order: 10,view: 'text', type: 'string',},
  //子表高级查询
  prdReturnDetail: {
    title: '生产退料_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        materialCode: {title: '物料',order: 1,view: 'text', type: 'string',},
        unit: {title: '单位',order: 2,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 3,view: 'text', type: 'string',},
        issueQty: {title: '领用数',order: 4,view: 'number', type: 'number',},
        qty: {title: '退料数',order: 5,view: 'number', type: 'number',},
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