import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '业务单号',
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
    title: '客户',
    align:"center",
    dataIndex: 'customerCode_dictText'
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
    title: '计划类型',
    align:"center",
    dataIndex: 'bizPlanType_dictText'
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
    label: "业务计划",
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
    //colProps: {span: 6},
  },
  {
    label: "客户",
    field: "customerCode",
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentCustomer"
    }

  },
  {
    label: '计划类型',
    field: 'bizPlanType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_biz_plan_type"
    },
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '业务单号',
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
    label: '计划类型',
    field: 'bizPlanType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_biz_plan_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择计划类型!'},
      ];
    },
    defaultValue:0
  },
  {
    label: '客户',
    field: 'customerCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentCustomer"
    },
    ifShow:({values}) => {
      return values.bizPlanType== 0
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择客户!'},
      ];
    },
  },


  {
    label: '要求交期',
    field: 'requiredDeliveryTime',
    component: 'DatePicker',
    componentProps: {
      style: {width: '100%'},
      valueFormat: 'YYYY-MM-DD',
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入制单日期!'},
      ];
    }
  },
  {
    label: '销售订单',
    field: 'salOrderDocCodes',
    component: 'JPopup',
    componentProps: ({formActionType,formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_sal_order",
        fieldConfig: [
          {source: 'doc_code', target: 'salOrderDocCodes'},
          {source: 'id', target: 'salOrderIds'},
          {source: 'detail_id', target: 'salOrderDetailIds'},
        ],
        multi: true,
        param: {customer_code: `'${formModel.customerCode}'`}
      }
    },
    ifShow:({values}) => {
        return values.bizPlanType== 0
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售订单!'},
      ];
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'salOrderIds',
    component: 'Input',
    show: false
  },
  {
    label: '',
    field: 'salOrderDetailIds',
    component: 'Input',
    show: false
  },

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
    title: '货品',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode:'CurrentMaterial',
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
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
      title: '订单数',
      key: 'orderQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled: true
    },
    {
      title: '计划数',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{required: true, message: '${title}不能为空'}],
    },

    {
      title: 'BOM编码',
      key: 'bomCode',
      type: JVxeTypes.input,
      width:"150px",
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
export const salBizPlanBomDetailColumns: JVxeColumn[] = [
    {
      title: 'BOM编码',
      key: 'bomCode',
      type: JVxeTypes.input,
      width:"150px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  {
    title: '货品',
    key: 'productionMaterialCode',
    type: JVxeTypes.selectSearch,
    dictCode:'CurrentMaterial',
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled:true,
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
    {
      title: '物料',
      key: 'materialCode',
      type: JVxeTypes.selectSearch,
      dictCode:'CurrentMaterial',
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
    title: '用量',
    key: 'standardQty',
    type: JVxeTypes.inputNumber,
    width:"100px",
    placeholder: '请输入${title}',
    defaultValue:'',
    validateRules: [{required: true, message: '${title}不能为空'}],
    disabled: true
  },
    {
      title: '需求数',
      key: 'requiredQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      validateRules: [{required: true, message: '${title}不能为空'}],
    },
    {
      title: '库存数',
      key: 'stockQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
    },
    {
      title: '在途数',
      key: 'inTransitQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
    },
    {
      title: '可用数',
      key: 'availableQty',
      type: JVxeTypes.inputNumber,
      width:"100px",
      placeholder: '请输入${title}',
      defaultValue:'',
      disabled:true,
    },
    {
      title: '备注',
      key: 'remark',
      type: JVxeTypes.input,
      width:"300px",
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
