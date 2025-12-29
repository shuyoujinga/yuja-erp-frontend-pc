import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '生产工单',
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
    title: '排产单号_IDS',
    align:"center",
    dataIndex: 'mpsIds'
   },
   {
    title: '排查单号',
    align:"center",
    dataIndex: 'mpsDocCodes'
   },
   {
    title: '产线',
    align:"center",
    dataIndex: 'prdLine'
   },
   {
    title: '生产产品',
    align:"center",
    dataIndex: 'materialCode'
   },
   {
    title: '单位',
    align:"center",
    dataIndex: 'unit'
   },
   {
    title: '规格',
    align:"center",
    dataIndex: 'specifications'
   },
   {
    title: '计划数量',
    align:"center",
    dataIndex: 'planQty'
   },
   {
    title: '数量',
    align:"center",
    dataIndex: 'qty'
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
   {
    title: '状态',
    align:"center",
    dataIndex: 'status'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '生产工单',
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
    label: '排产单号_IDS',
    field: 'mpsIds',
    component: 'Input',
  },
  {
    label: '排查单号',
    field: 'mpsDocCodes',
    component: 'Input',
  },
  {
    label: '产线',
    field: 'prdLine',
    component: 'Input',
  },
  {
    label: '生产产品',
    field: 'materialCode',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'specifications',
    component: 'Input',
  },
  {
    label: '计划数量',
    field: 'planQty',
    component: 'InputNumber',
  },
  {
    label: '数量',
    field: 'qty',
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
  {
    label: '状态',
    field: 'status',
    component: 'InputNumber',
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
export const prdWorkOrderDetailColumns: JVxeColumn[] = [
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
      title: '工序',
      key: 'processCode',
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
  docCode: {title: '生产工单',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  mpsIds: {title: '排产单号_IDS',order: 2,view: 'text', type: 'string',},
  mpsDocCodes: {title: '排查单号',order: 3,view: 'text', type: 'string',},
  prdLine: {title: '产线',order: 4,view: 'text', type: 'string',},
  materialCode: {title: '生产产品',order: 5,view: 'text', type: 'string',},
  unit: {title: '单位',order: 6,view: 'text', type: 'string',},
  specifications: {title: '规格',order: 7,view: 'text', type: 'string',},
  planQty: {title: '计划数量',order: 8,view: 'number', type: 'number',},
  qty: {title: '数量',order: 9,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 10,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 11,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 12,view: 'date', type: 'string',},
  remark: {title: '备注',order: 13,view: 'text', type: 'string',},
  status: {title: '状态',order: 14,view: 'number', type: 'number',},
  //子表高级查询
  prdWorkOrderDetail: {
    title: '生产工单_物料明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        materialCode: {title: '物料',order: 1,view: 'text', type: 'string',},
        unit: {title: '单位',order: 2,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 3,view: 'text', type: 'string',},
        processCode: {title: '工序',order: 4,view: 'text', type: 'string',},
        qty: {title: '数量',order: 5,view: 'number', type: 'number',},
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
