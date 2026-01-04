import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '预收单号',
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
    dataIndex: 'docTime'
   },
   {
    title: '客户',
    align:"center",
    dataIndex: 'customerCode_dictText'
   },
   {
    title: '金额',
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
    label: "预收单号",
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
    label: '预收单号',
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
    label: '预收使用',
    field: 'useAmount',
    component: 'InputNumber',
    dynamicDisabled:true
  },
  {
    label: '本次预收',
    field: 'amount',
    component: 'InputNumber',
  },
  {
    label: '预收余额',
    field: 'prepayAmount',
    component: 'InputNumber',
    dynamicDisabled:true
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
export const salPrepayDetailColumns: JVxeColumn[] = [
    {
      title: '结算单号',
      key: 'receiptCode',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
    {
      title: '冲抵金额',
      key: 'amount',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
    {
      title: '备注',
      key: 'remark',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
  ]


// 高级查询数据
export const superQuerySchema = {
  docCode: {title: '预收单号',order: 0,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 1,view: 'text', type: 'string',},
  customerCode: {title: '客户',order: 2,view: 'text', type: 'string',},
  amount: {title: '金额',order: 3,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 4,view: 'number', type: 'number',},
  auditBy: {title: '审核人',order: 5,view: 'text', type: 'string',},
  auditTime: {title: '审核时间',order: 6,view: 'date', type: 'string',},
  status: {title: '状态',order: 7,view: 'number', type: 'number',},
  remark: {title: '备注',order: 8,view: 'text', type: 'string',},
  //子表高级查询
  salPrepayDetail: {
    title: '预收使用_明细',
    view: 'table',
    fields: {
        pid: {title: '主表ID',order: 0,view: 'text', type: 'string',},
        receiptId: {title: '销售收款ID',order: 1,view: 'text', type: 'string',},
        receiptCode: {title: '收款单号',order: 2,view: 'text', type: 'string',},
        amount: {title: '金额',order: 3,view: 'number', type: 'number',},
        remark: {title: '备注',order: 4,view: 'text', type: 'string',},
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
