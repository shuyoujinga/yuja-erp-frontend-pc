import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [


  {
    title: '申请单号',
    align: "center",
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
    align: "center",
    dataIndex: 'docTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
  },
  {
    title: '所属部门',
    align: "center",
    dataIndex: 'sysOrgCode_dictText'
  },
  {
    title: '申请类型',
    align: "center",
    dataIndex: 'applyType_dictText'
  },
  {
    title: '金额合计',
    align: "center",
    dataIndex: 'amount'
  },
  {
    title: '申请原因',
    align: "center",
    dataIndex: 'applyReason'
  },
  {
    title: '审核状态',
    align: "center",
    dataIndex: 'audit_dictText'
  },
  {
    title: '单据状态',
    align: "center",
    dataIndex: 'status_dictText'
  },
  {
    title: '审核人',
    align: "center",
    dataIndex: "auditBy_dictText"
  },
  {
    title: '审核时间',
    align: "center",
    dataIndex: 'auditTime'
  },
  {
    title: '创建人',
    align: "center",
    dataIndex: 'createBy_dictText'
  },
  {
    title: '创建日期',
    align: "center",
    dataIndex: 'createTime'
  },
  {
    title: '备注',
    align: "center",
    dataIndex: 'remark'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
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
    label: "申请类型",
    field: "applyType",
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_apply_type"
    },
    //colProps: {span: 6},
  },
  {
    label: "审核状态",
    field: "audit",
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_audit_status"
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '申请单号',
    field: 'docCode',
    component: 'Input',
    dynamicDisabled: true
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
    defaultValue: new Date(),
  },
  {
    label: '申请类型',
    field: 'applyType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_apply_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入申请类型!'},
      ];
    },
  },
  {
    label: '金额合计',
    field: 'amount',
    component: 'InputNumber',
    dynamicDisabled: true
  },
  {
    label: '申请原因',
    field: 'applyReason',
    component: 'Input',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入申请原因!'},
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
    field: 'id',
    component: 'Input',
    show: false
  },
];
//子表单数据
//子表表格配置
export const purApplyDetailColumns: JVxeColumn[] = [
  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    options: [],
    dictCode: "CurrentMaterial",
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [
      {required: true, message: '${title}不能为空'},
    ],
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
    title: '单位',
    key: 'unit',
    type: JVxeTypes.selectSearch,
    options: [],
    dictCode: "dict_materials_unit",
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '数量',
    key: 'applyQty',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [
      {required: true, message: '${title}不能为空'},
    ],
  },
  {
    title: '价格',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [
      {required: true, message: '${title}不能为空'},
    ],
  },
  {
    title: '金额',
    key: 'amount',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '备注',
    key: 'remark',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
  },
]


// 高级查询数据
export const superQuerySchema = {
  createBy: {title: '创建人', order: 0, view: 'text', type: 'string',},
  createTime: {title: '创建日期', order: 1, view: 'datetime', type: 'string',},
  sysOrgCode: {title: '所属部门', order: 2, view: 'text', type: 'string',},
  docCode: {title: '申请单号', order: 3, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 4, view: 'date', type: 'string',},
  applyType: {
    title: '申请类型',
    order: 5,
    view: 'sel_search',
    type: 'string',
    dictCode: 'dict_apply_type',
  },
  applyReason: {title: '申请原因', order: 6, view: 'text', type: 'string',},
  audit: {
    title: '审核状态',
    order: 7,
    view: 'sel_search',
    type: 'string',
    dictCode: 'dict_audit_status',
  },
  auditBy: {title: '审核人', order: 8, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 9, view: 'datetime', type: 'string',},
  remark: {title: '备注', order: 10, view: 'text', type: 'string',},
  //子表高级查询
  purApplyDetail: {
    title: '采购申请明细',
    view: 'table',
    fields: {
      materialCode: {title: '物料', order: 0, view: 'text', type: 'string',},
      specifications: {title: '规格', order: 1, view: 'text', type: 'string',},
      unit: {title: '单位', order: 2, view: 'text', type: 'string',},
      unitPrice: {title: '价格', order: 3, view: 'text', type: 'string',},
      remark: {title: '备注', order: 4, view: 'text', type: 'string',},
    }
  },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
// 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
