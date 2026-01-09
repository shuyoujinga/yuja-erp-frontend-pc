import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '领料单号',
    align: "center",
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
    align: "center",
    dataIndex: 'docTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
  },
  {
    title: '领料类型',
    align: "center",
    dataIndex: 'issueType_dictText'
  },
  {
    title: '产线',
    align: "center",
    dataIndex: 'prdLine_dictText'
  },

  {
    title: '生产工单',
    align: "center",
    dataIndex: 'workOrderCodes'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'status_dictText'
  },
  {
    title: '生产产品',
    align: "center",
    dataIndex: 'materialCode_dictText'
  },
  {
    title: '工单数量',
    align: "center",
    dataIndex: 'qty'
  },

  {
    title: '审核状态',
    align: "center",
    dataIndex: 'audit_dictText'
  },
  {
    title: '审核人',
    align: "center",
    dataIndex: "auditBy_dictText"
  },
  {
    title: '审核时间',
    align: "center",
    dataIndex: 'auditTime',
    customRender: ({text}) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
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
    label: '领料单号',
    field: 'docCode',
    component: 'Input',
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
    label: '产线',
    field: 'prdLine',
    component: 'JSearchSelect',
    componentProps: {
      dict: "sys_depart,depart_name,org_code,org_category=3"
    },
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '领料单号',
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
    defaultValue: new Date()
  },
  {
    label: '领料类型',
    field: 'issueType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_prd_issue_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入领料类型!'},
      ];
    },
    defaultValue: 0,
  },
  {
    label: '产线',
    field: 'prdLine',
    component: 'JSearchSelect',
    componentProps: {
      dict: "sys_depart,depart_name,org_code,org_category=3"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入领料类型!'},
      ];
    },
  },

  {
    label: '生产工单',
    field: 'workOrderCodes',
    component: 'JPopup',
    componentProps: ({formActionType, formModel}) => {
      const {setFieldsValue} = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: "report_prd_work",
        fieldConfig: [
          {source: 'doc_code', target: 'workOrderCodes'},
          {source: 'id', target: 'workOrderIds'},
          {source: 'detail_id', target: 'workOrderDetailIds'},
          {source: 'production_material_code', target: 'materialCode'},
          {source: 'work_qty', target: 'qtyStr'},
        ],
        multi: true,
        param: {prd_line: `'${formModel.prdLine}'`}
      }
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择销售订单!'},
      ];
    },
  },

  {
    label: '生产产品',
    field: 'materialCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentMaterial"
    },
    dynamicDisabled: true
  },
  {
    label: '工单数量',
    field: 'qty',
    component: 'InputNumber',
    dynamicDisabled: true
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
  {
    label: '工单数量_Str',
    field: 'qtyStr',
    component: 'Input',
    show: false
  },
  {
    label: '工单IDS',
    field: 'workOrderIds',
    component: 'Input',
    show: false
  },
  {
    label: '工单明细IDS',
    field: 'workOrderDetailIds',
    component: 'Input',
    show: false
  },
];
//子表单数据
//子表表格配置
export const prdIssueDetailColumns: JVxeColumn[] = [

  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentMaterial',
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
    title: '仓库',
    key: 'warehouseCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentWarehouse',
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '库存数量',
    key: 'stockQty',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '数量',
    key: 'qty',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}, {
      handler({cellValue, row}, callback) {
        const stockQty = Number(row.stockQty || 0)
        const shipQty = Number(cellValue || 0)

        if (shipQty > stockQty) {
          callback(false, '领料库存不足，不允许填写!')
          return
        }


        callback(true)
      }
    }],
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
  docCode: {title: '领料单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  issueType: {title: '领料类型', order: 2, view: 'number', type: 'number',},
  prdLine: {title: '产线', order: 3, view: 'text', type: 'string',},
  workOrderIds: {title: '生产工单_IDS', order: 4, view: 'text', type: 'string',},
  workOrderCodes: {title: '生产工单', order: 5, view: 'text', type: 'string',},
  materialCode: {title: '生产产品', order: 6, view: 'text', type: 'string',},
  qty: {title: '工单数量', order: 7, view: 'number', type: 'number',},
  status: {title: '状态', order: 8, view: 'number', type: 'number',},
  audit: {title: '审核状态', order: 9, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 10, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 11, view: 'date', type: 'string',},
  remark: {title: '备注', order: 12, view: 'text', type: 'string',},
  //子表高级查询
  prdIssueDetail: {
    title: '生产领料_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      materialCode: {title: '物料', order: 1, view: 'text', type: 'string',},
      unit: {title: '单位', order: 2, view: 'text', type: 'string',},
      specifications: {title: '规格', order: 3, view: 'text', type: 'string',},
      qty: {title: '数量', order: 4, view: 'number', type: 'number',},
      remark: {title: '备注', order: 5, view: 'text', type: 'string',},
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
