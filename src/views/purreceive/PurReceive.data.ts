import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [

   {
    title: '收货单号',
    align:"center",
    dataIndex: 'docCode',
     customRender: ({record}) => {
       return h(
         'a',
         {
           style: {color: '#1890ff', cursor: 'pointer'},
           onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
         },
         record.docCode,
       );
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
    title: '所属部门',
    align:"center",
    dataIndex: 'sysOrgCode_dictText'
  },
   {
    title: '供应商',
    align:"center",
    dataIndex: 'supplierCode_dictText'
   },
   {
    title: '对方单号',
    align:"center",
    dataIndex: 'externalOrderNo'
   },
  {
    title: '退货生成',
    align:"center",
    dataIndex: 'isReturn_dictText'
  },
   {
    title: '采购订单',
    align:"center",
    dataIndex: 'orderCode'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status_dictText'
   },
   {
    title: '金额合计',
    align:"center",
    dataIndex: 'amount'
   },
   {
    title: '审核状态',
    align:"center",
    dataIndex: 'audit_dictText'
   },
   {
    title: '审核人',
    align:"center",
    dataIndex: 'auditBy_dictText'
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
    title: '创建人',
    align:"center",
    dataIndex: 'createBy_dictText'
  },
  {
    title: '创建日期',
    align:"center",
    dataIndex: 'createTime'
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
      label: "收货单号",
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
         dict:"CurrentSupplier"
      },
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '收货单号',
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
    defaultValue: new Date()
  },
  {
    label: '供应商',
    field: 'supplierCode',
    component: 'JSearchSelect',
    componentProps:{
       dict:"CurrentSupplier"
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入供应商!'},
          ];
     },
  },
  {
    label: '对方单号',
    field: 'externalOrderNo',
    component: 'Input',
  },
  {
    label: '采购订单',
    field: 'orderCode',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const {setFieldsValue} = formActionType;
      return{
        setFieldsValue:setFieldsValue,
        code:"report_pur_order",
        fieldConfig: [
          { source: 'doc_code', target: 'orderCode' },
          { source: 'main_id', target: 'orderId' },
          { source: 'supplier_code', target: 'supplierCode' },
        ],
        multi:true,
        param: {supplier_code:"'supplier_code'"}
      }
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入采购订单!'},
      ];
    },
  },

  {
    label: '金额合计',
    field: 'amount',
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
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'orderId',
    component: 'Input',
    show: false
  },
  {
    label: '',
    field: 'orderDetailId',
    component: 'Input',
    show: false
  },
];
//子表单数据
//子表表格配置
export const purReceiveDetailColumns: JVxeColumn[] = [
    {
      title: '物料',
      key: 'materialCode',
      type: JVxeTypes.select,
      options:[],
      dictCode:"CurrentMaterial",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
      validateRules: [{ required: true, message: '${title}不能为空' }],
    },
    {
      title: '规格',
      key: 'specifications',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
    {
      title: '单位',
      key: 'unit',
      type: JVxeTypes.select,
      options:[],
      dictCode:"dict_materials_unit",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
    {
      title: '数量',
      key: 'receiveQty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{ required: true, message: '${title}不能为空' }],
    },
    {
      title: '单价',
      key: 'unitPrice',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
    {
      title: '金额',
      key: 'amount',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: JVxeTypes.selectSearch,
      dictCode:"CurrentWarehouse",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{ required: true, message: '${title}不能为空' }],
    },
    // {
    //   title: '仓位',
    //   key: 'locationCode',
    //   type: JVxeTypes.inputNumber,
    //   width:"200px",
    //   placeholder: '请输入${title}',
    //   defaultValue:'',
    // },
    {
      title: '引用单号',
      key: 'refCode',
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


// 高级查询数据
export const superQuerySchema = {
  createBy: {title: '创建人',order: 0,view: 'list', type: 'string',dictTable: "sys_user", dictCode: 'username', dictText: 'realname',},
  createTime: {title: '创建日期',order: 1,view: 'datetime', type: 'string',},
  sysOrgCode: {title: '所属部门',order: 2,view: 'text', type: 'string',},
  docCode: {title: '收货单号',order: 3,view: 'text', type: 'string',},
  docTime: {title: '制单日期',order: 4,view: 'date', type: 'string',},
  supplierCode: {title: '供应商',order: 5,view: 'sel_search', type: 'string',},
  externalOrderNo: {title: '对方单号',order: 6,view: 'text', type: 'string',},
  orderCode: {title: '采购订单',order: 7,view: 'popup', type: 'string',code: '', orgFields: '', destFields: 'orderCode', popupMulti: false,},
  status: {title: '状态',order: 8,view: 'number', type: 'number',},
  amount: {title: '金额合计',order: 9,view: 'number', type: 'number',},
  audit: {title: '审核状态',order: 10,view: 'number', type: 'number',dictCode: 'dict_audit_status',},
  auditBy: {title: '审核人',order: 11,view: 'list', type: 'string',dictTable: "sys_user", dictCode: 'username', dictText: 'realname',},
  auditTime: {title: '审核时间',order: 12,view: 'date', type: 'string',},
  remark: {title: '备注',order: 13,view: 'text', type: 'string',},
  //子表高级查询
  purReceiveDetail: {
    title: '采购收货_明细',
    view: 'table',
    fields: {
        materialCode: {title: '物料',order: 0,view: 'list', type: 'string',dictTable: "yujiakeji_materials", dictCode: 'material_code', dictText: 'material_name',},
        specifications: {title: '规格',order: 1,view: 'text', type: 'string',},
        unit: {title: '单位',order: 2,view: 'list', type: 'string',dictCode: 'dict_materials_unit',},
        receiveQty: {title: '数量',order: 3,view: 'number', type: 'number',},
        unitPrice: {title: '单价',order: 4,view: 'number', type: 'number',},
        amount: {title: '金额',order: 5,view: 'number', type: 'number',},
        warehouseCode: {title: '仓库',order: 6,view: 'number', type: 'number',},
        locationCode: {title: '仓位',order: 7,view: 'number', type: 'number',},
        refCode: {title: '引用单号',order: 8,view: 'text', type: 'string',},
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
