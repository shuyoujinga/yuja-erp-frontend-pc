import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '退货单号 ',
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
    title: '所属部门',
    align: "center",
    dataIndex: 'sysOrgCode_dictText'
  },
   {
    title: '供应商',
    align:"center",
    dataIndex: 'supplierCode_dictText'
   },

  {
    title: '状态',
    align:"center",
    dataIndex: 'status_dictText'
  },

  {
    title: '退货类型',
    align:"center",
    dataIndex: 'returnType_dictText'
   },
   {
    title: '退货金额',
    align:"center",
    dataIndex: 'amount'
   },

   {
    title: '采购订单',
    align:"center",
    dataIndex: 'orderCodes'
   },
  {
    title: '审核状态',
    align:"center",
    dataIndex: 'audit_dictText'
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
	{
      label: "退货单号 ",
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
      componentProps:{
         dict:",,"
      },
      //colProps: {span: 6},
 	},
	{
      label: "审核状态",
      field: "audit",
      component: 'JDictSelectTag',
      componentProps:{
      },
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '退货单号 ',
    field: 'docCode',
    component: 'Input',
  },
  {
    label: '制单日期',
    field: 'docTime',
    component: 'DatePicker',
  },
  {
    label: '供应商',
    field: 'supplierCode',
    component: 'JSearchSelect',
    componentProps:{
       dict:""
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入供应商!'},
          ];
     },
  },
  {
    label: '审核状态',
    field: 'audit',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
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
    label: '退货类型',
    field: 'returnType',
    component: 'Input',
  },
  {
    label: '退货金额',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'status',
    component: 'InputNumber',
  },
  {
    label: '采购订单_ids',
    field: 'orderIds',
    component: 'Input',
  },
  {
    label: '采购订单',
    field: 'orderCodes',
    component: 'Input',
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
export const purReturnDetailColumns: JVxeColumn[] = [
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
      title: '物料',
      key: 'materialCode',
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
      title: '单价',
      key: 'orderUnitPrice',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '订单金额',
      key: 'orderAmount',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '退货数',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '退货单价',
      key: 'unitPrice',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '退货金额',
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
  docCode: {title: '退货单号 ',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'date', type: 'string',},
  supplierCode: {title: '供应商',order: 2,view: 'sel_search', type: 'string',},
  audit: {title: '审核状态',order: 3,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 4,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 5,view: 'date', type: 'string',},
  returnType: {title: '退货类型',order: 6,view: 'text', type: 'string',},
  amount: {title: '退货金额',order: 7,view: 'number', type: 'number',},
  status: {title: '状态',order: 8,view: 'number', type: 'number',},
  orderIds: {title: '采购订单_ids',order: 9,view: 'text', type: 'string',},
  orderCodes: {title: '采购订单',order: 10,view: 'text', type: 'string',},
  remark: {title: '备注',order: 11,view: 'text', type: 'string',},
  //子表高级查询
  purReturnDetail: {
    title: '采购退货_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        orderDetailId: {title: '订单明细ID',order: 1,view: 'text', type: 'string',},
        materialCode: {title: '物料',order: 2,view: 'text', type: 'string',},
        orderQty: {title: '订单数',order: 3,view: 'number', type: 'number',},
        orderUnitPrice: {title: '单价',order: 4,view: 'number', type: 'number',},
        orderAmount: {title: '订单金额',order: 5,view: 'number', type: 'number',},
        qty: {title: '退货数',order: 6,view: 'number', type: 'number',},
        unitPrice: {title: '退货单价',order: 7,view: 'number', type: 'number',},
        amount: {title: '退货金额',order: 8,view: 'number', type: 'number',},
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
