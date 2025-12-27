import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '物料凭证',
    align:"center",
    dataIndex: 'docCode',
     customRender: ({ record }) => {
       return h(
         'a',
         {
           style: { color: '#1890ff', cursor: 'pointer' },
           onClick: () => window?.handleDetail?.(record) && record, // 下面会注册
         },
         record.docCode,
       );
     }
   },
   {
    title: '记账日期',
    align:"center",
    dataIndex: 'docTime',
    customRender:({text}) =>{
      return !text?"":(text.length>10?text.substr(0,10):text)
    },
   },
   {
    title: '业务类型',
    align:"center",
    dataIndex: 'bizType_dictText'
   },
   {
    title: '单据类型',
    align:"center",
    dataIndex: 'sourceDocType_dictText'
   },
   {
    title: '来源单据',
    align:"center",
    dataIndex: 'sourceDocCode'
   },
   {
    title: '主移动类型',
    align:"center",
    dataIndex: 'moveType_dictText'
   },
  {
    title: '是否冲销',
    align:"center",
    dataIndex: 'isReversal_dictText'
  },
   {
    title: '冲销凭证',
    align:"center",
    dataIndex: 'reversalDocId_dictText'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remark'
   },
];

export const innerColumns: BasicColumn[] = [
  {
    title: '凭证行号',
    align:"center",
    dataIndex: 'lineNo'
  },
  {
    title: '移动类型',
    align:"center",
    dataIndex: 'moveType_dictText'
  },
  {
    title: '出入库类型',
    align:"center",
    dataIndex: 'stockType_dictText'
  },
  {
    title: '物料编码',
    align:"center",
    dataIndex: 'materialCode'
  },
  {
    title: '物料名称',
    align:"center",
    dataIndex: 'materialName'
  },
  {
    title: '规格',
    align:"center",
    dataIndex: 'specifications'
  },
  {
    title: '单位',
    align:"center",
    dataIndex: 'unit_dictText'
  },
  {
    title: '移动数量',
    align:"center",
    dataIndex: 'qty'
  },
  {
    title: '单价',
    align:"center",
    dataIndex: 'price'
  },
  {
    title: '金额',
    align:"center",
    dataIndex: 'amount'
  },
  {
    title: '仓库',
    align:"center",
    dataIndex: 'warehouseCode_dictText'
  },
  {
    title: '库位',
    align:"center",
    dataIndex: 'locationCode'
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
      label: "物料凭证",
      field: "docCode",
      component: 'Input',
      //colProps: {span: 6},
 	},
     {
      label: "记账日期",
      field: "docTime",
      component: 'RangePicker',
      componentProps: {
          valueType: 'Date',
      },
      //colProps: {span: 6},
	},
	{
      label: "业务类型",
      field: "bizType",
      component: 'JSearchSelect',
      componentProps:{
         dict:"dict_biz_type"
      },
      //colProps: {span: 6},
 	},
	{
      label: "来源单据类型",
      field: "sourceDocType",
      component: 'JSearchSelect',
      componentProps:{
         dict:"dict_source_doc_type"
      },
      //colProps: {span: 6},
 	},
	{
      label: "来源单据号",
      field: "sourceDocCode",
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "主移动类型",
      field: "moveType",
      component: 'JSearchSelect',
      componentProps:{
      },
      //colProps: {span: 6},
 	},
	{
      label: "冲销凭证",
      field: "reversalDocId",
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "是否冲销",
      field: "isReversal",
      component: 'JSearchSelect',
      componentProps:{
         dict:"yn"
      },
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '物料凭证',
    field: 'docCode',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '记账日期',
    field: 'docTime',
    component: 'DatePicker',
    dynamicDisabled:true,
    componentProps: {
      style: {width: '100%'},
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '业务类型',
    field: 'bizType',
    component: 'JSearchSelect',
    componentProps:{
       dict:"dict_biz_type"
    },
    dynamicDisabled:true
  },
  {
    label: '来源单据类型',
    field: 'sourceDocType',
    component: 'JSearchSelect',
    componentProps:{
       dict:"dict_source_doc_type"
    },
    dynamicDisabled:true
  },
  {
    label: '来源单据号',
    field: 'sourceDocCode',
    component: 'Input',
    dynamicDisabled:true
  },
  {
    label: '主移动类型',
    field: 'moveType',
    component: 'JSearchSelect',
    componentProps:{
        dict:"inv_move_type,move_desc,move_type"
     },
    dynamicDisabled:true
  },
  {
    label: '冲销凭证',
    field: 'reversalDocId',
    component: 'JSearchSelect',
    componentProps:{
      dict:"inv_material_voucher,doc_code,id"
    },
    dynamicDisabled:true
  },
  {
    label: '是否冲销',
    field: 'isReversal',
    component: 'JSearchSelect',
    componentProps:{
       dict:"yn"
    },
    dynamicDisabled:true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
    dynamicDisabled:true
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
export const invMaterialVoucherDetailColumns: JVxeColumn[] = [
    {
      title: '行号',
      key: 'lineNo',
      type: JVxeTypes.inputNumber,
      width:"50px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '物料',
      key: 'materialCode',
      type: JVxeTypes.selectSearch,
      dictCode:"CurrentMaterial",
      width:"350px",
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
      title: '单位',
      key: 'unit',
      type: JVxeTypes.selectSearch,
      dictCode:"dict_materials_unit",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
        validateRules: [
          { required: true, message: '${title}不能为空' },
        ],
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: JVxeTypes.selectSearch,
      dictCode:"CurrentWarehouse",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
        validateRules: [
          { required: true, message: '${title}不能为空' },
        ],
    },
    {
      title: '库位',
      key: 'locationCode',
      type: JVxeTypes.input,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
        validateRules: [
          { required: true, message: '${title}不能为空' },
        ],
    },
    {
      title: '移动数量',
      key: 'qty',
      type: JVxeTypes.inputNumber,
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
        validateRules: [
          { required: true, message: '${title}不能为空' },
        ],
    },
    {
      title: '单价',
      key: 'price',
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
      title: '移动类型',
      key: 'moveType',
      type: JVxeTypes.selectSearch,
      dictCode:"inv_move_type,move_desc,move_type",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
    {
      title: '出入库类型',
      key: 'stockType',
      type: JVxeTypes.selectSearch,
      dictCode:"dict_in_out_type",
      width:"200px",
      placeholder: '请输入${title}',
      defaultValue:'',
    },
  ]


// 高级查询数据
export const superQuerySchema = {
  docCode: {title: '物料凭证',order: 0,view: 'text', type: 'string',},
  docTime: {title: '记账日期',order: 1,view: 'date', type: 'string',},
  bizType: {title: '业务类型',order: 2,view: 'sel_search', type: 'string',dictCode: 'dict_biz_type',},
  sourceDocType: {title: '来源单据类型',order: 3,view: 'number', type: 'number',dictCode: 'dict_source_doc_type',},
  soureDocCode: {title: '来源单据号',order: 4,view: 'text', type: 'string',},
  moveType: {title: '主移动类型',order: 5,view: 'list', type: 'string',},
  reversalDocId: {title: '冲销凭证',order: 6,view: 'text', type: 'string',},
  isReversal: {title: '是否冲销',order: 7,view: 'sel_search', type: 'string',dictCode: 'yn',},
  remark: {title: '备注',order: 8,view: 'text', type: 'string',},
  //子表高级查询
  invMaterialVoucherDetail: {
    title: '物料凭证_明细',
    view: 'table',
    fields: {
        sourceDocDetailId: {title: '来源单据明细ID',order: 0,view: 'text', type: 'string',},
        lineNo: {title: '行号',order: 1,view: 'number', type: 'number',},
        materialCode: {title: '物料',order: 2,view: 'sel_search', type: 'string',},
        materialName: {title: '物料名称',order: 3,view: 'text', type: 'string',},
        specifications: {title: '规格',order: 4,view: 'text', type: 'string',},
        unit: {title: '单位',order: 5,view: 'text', type: 'string',},
        warehouseCode: {title: '仓库',order: 6,view: 'text', type: 'string',},
        locationCode: {title: '库位',order: 7,view: 'text', type: 'string',},
        qty: {title: '移动数量',order: 8,view: 'number', type: 'number',},
        price: {title: '单价',order: 9,view: 'number', type: 'number',},
        amount: {title: '金额',order: 10,view: 'number', type: 'number',},
        moveType: {title: '移动类型',order: 11,view: 'text', type: 'string',},
        stockType: {title: '出入库类型',order: 12,view: 'number', type: 'number',},
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
