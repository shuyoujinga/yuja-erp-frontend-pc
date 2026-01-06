import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import {h} from "vue";
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '组装单号',
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
    title: '组装入库',
    align: "center",
    dataIndex: 'inWarehouseCode_dictText'
  },
  {
    title: '组装出库',
    align: "center",
    dataIndex: 'outWarehouseCode_dictText'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'status_dictText'
  },
  {
    title: '审核状态',
    align: "center",
    dataIndex: 'audit_dictText'
  },
  {
    title: '审核人',
    align: "center",
    dataIndex: 'auditBy_dictText'
  },
  {
    title: '审核时间',
    align: "center",
    dataIndex: 'auditTime'
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
    label: '组装单号',
    field: 'docCode',
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
    label: '组装出库',
    field: 'outWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
  },
  {
    label: '组装入库',
    field: 'inWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '组装单号',
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
    label: '组装入库',
    field: 'inWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入制单日期!'},
      ];
    }
  },
  {
    label: '组装出库',
    field: 'outWarehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入制单日期!'},
      ];
    }
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
export const invAssemblyDetailColumns: JVxeColumn[] = [

  {
    title: '物料',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentMaterial',
    options: [],
    width: '350px',
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.selectSearch,
    dictCode: "dict_materials_unit",
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '规格',
    key: 'specifications',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '数量',
    key: 'qty',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'},
      {
        handler({cellValue, row}, callback) {
          const unitPrice = Number(row.unitPrice || 0)
          const shipQty = Number(cellValue || 0)

          // === 四舍五入处理（保留 2 位小数）===
          const rawAmount = shipQty * unitPrice
          row.amount = Math.round(rawAmount * 100) / 100


          callback(true)
        }
      }],
  },
  {
    title: '单价',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: '金额',
    key: 'amount',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
  },
  {
    title: 'BOM编号',
    key: 'bomCode',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
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
export const invAssemblyBomDetailColumns: JVxeColumn[] = [
  {
    title: 'BOM编码',
    key: 'bomCode',
    type: JVxeTypes.input,
    width: "150px",
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '货品',
    key: 'productionMaterialCode',
    type: JVxeTypes.selectSearch,
    dictCode: 'CurrentMaterial',
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true,
    validateRules: [{required: true, message: '${title}不能为空'}],
  },
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
    title: '用量',
    key: 'standardQty',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{required: true, message: '${title}不能为空'}],
    disabled: true
  },
  {
    title: '数量',
    key: 'qty',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
  },
  {
    title: '单价',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled: true
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
  docCode: {title: '组装单号', order: 0, view: 'text', type: 'string',},
  docTime: {title: '制单日期', order: 1, view: 'date', type: 'string',},
  inWarehouseCode: {title: '组装入库', order: 2, view: 'text', type: 'string',},
  outWarehouseCode: {title: '组装出库', order: 3, view: 'text', type: 'string',},
  status: {title: '状态', order: 4, view: 'number', type: 'number',},
  audit: {title: '审核状态', order: 5, view: 'number', type: 'number',},
  auditBy: {title: '审核人', order: 6, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 7, view: 'text', type: 'string',},
  remark: {title: '备注', order: 8, view: 'text', type: 'string',},
  //子表高级查询
  invAssemblyDetail: {
    title: '组装单_明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      materialCode: {title: '物料', order: 1, view: 'text', type: 'string',},
      unit: {title: '单位', order: 2, view: 'text', type: 'string',},
      specifications: {title: '规格', order: 3, view: 'text', type: 'string',},
      qty: {title: '数量', order: 4, view: 'number', type: 'number',},
      unitPrice: {title: '单价', order: 5, view: 'number', type: 'number',},
      amount: {title: '金额', order: 6, view: 'number', type: 'number',},
      remark: {title: '备注', order: 7, view: 'text', type: 'string',},
    }
  },
  invAssemblyBomDetail: {
    title: '组装单_材料明细',
    view: 'table',
    fields: {
      pid: {title: '主表ID', order: 0, view: 'text', type: 'string',},
      bomCode: {title: 'BOM编号', order: 1, view: 'text', type: 'string',},
      productionMaterialCode: {title: '货品', order: 2, view: 'text', type: 'string',},
      materialCode: {title: '物料', order: 3, view: 'text', type: 'string',},
      unit: {title: '单位', order: 4, view: 'text', type: 'string',},
      specifications: {title: '规格', order: 5, view: 'text', type: 'string',},
      standardQty: {title: '标准用量', order: 6, view: 'number', type: 'number',},
      qty: {title: '数量', order: 7, view: 'number', type: 'number',},
      unitPrice: {title: '单价', order: 8, view: 'number', type: 'number',},
      amount: {title: '金额', order: 9, view: 'number', type: 'number',},
      remark: {title: '备注', order: 10, view: 'text', type: 'string',},
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
