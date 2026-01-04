import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {JVxeTypes, JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
import { h } from 'vue';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: 'BOM编号',
    align: "center",
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
    title: 'BOM类型',
    align: "center",
    dataIndex: 'bomType_dictText'
  },
  {
    title: '所属部门',
    align: "center",
    dataIndex: 'sysOrgCode_dictText'
  },
  {
    title: '货品编码',
    align: "center",
    dataIndex: 'materialCode'
  },
  {
    title: '货品名称',
    align: "center",
    dataIndex: 'materialCode_dictText'
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
    title: '创建人',
    align: "center",
    dataIndex: 'createBy_dictText'
  },
  {
    title: '创建时间',
    align: "center",
    dataIndex: 'createTime',
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
    label: '物料编码',
    field: 'materialCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentMaterial"
    }
  },
  {
    label: "BOM类型",
    field: "bomType",
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "dict_bom_type"
    },
    //colProps: {span: 6},
  },
  {
    label: "审核状态",
    field: "audit",
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "dict_audit_status"
    },
    //colProps: {span: 6},

  },
  {
    label: "是否有效",
    field: "delFlag",
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "yn"
    },
    //colProps: {span: 6},

  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: 'BOM编号',
    field: 'docCode',
    component: 'Input',
    dynamicDisabled: true
  },
  {
    label: 'BOM类型',
    field: 'bomType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_bom_type"
    },
    required: true
  },
  {
    label: '物料编码',
    field: 'materialCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentMaterial,material_code  not  like 'A%'"
    },
    required: true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
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
export const yujiakejiBomDetailColumns: JVxeColumn[] = [
  {
    title: '物料编码',
    key: 'materialCode',
    type: JVxeTypes.selectSearch,
    options: [],
    dictCode: "CurrentMaterial",
    width: "350px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },

  {
    title: '单位',
    key: 'unit',
    type: JVxeTypes.select,
    options: [],
    dictCode: "dict_materials_unit",
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled:true
  },
  {
    title: '规格',
    key: 'specifications',
    type: JVxeTypes.input,
    width: "200px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled:true
  },
  {
    title: '用量',
    key: 'qty',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    validateRules: [{ required: true, message: '${title}不能为空' }],
  },
  {
    title: '单价',
    key: 'unitPrice',
    type: JVxeTypes.inputNumber,
    width: "100px",
    placeholder: '请输入${title}',
    defaultValue: '',
    disabled:true
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
  docCode: {title: 'BOM编号', order: 1, view: 'text', type: 'string',},
  bomType: {title: 'BOM类型', order: 2, view: 'number', type: 'number', dictCode: 'dict_bom_type',},
  materialCode: {
    title: '物料编码',
    order: 3,
    view: 'sel_search',
    type: 'string',
    dictCode: 'CurrentMaterial',
  },
  audit: {
    title: '审核状态',
    order: 4,
    view: 'number',
    type: 'number',
    dictCode: 'dict_audit_status',
  },
  auditBy: {title: '审核人', order: 5, view: 'text', type: 'string',},
  auditTime: {title: '审核时间', order: 6, view: 'date', type: 'string',},
  remark: {title: '备注', order: 7, view: 'textarea', type: 'string',},
  //子表高级查询
  yujiakejiBomDetail: {
    title: '材料清单_明细表',
    view: 'table',
    fields: {
      materialCode: {
        title: '物料编码',
        order: 0,
        view: 'list',
        type: 'string',
        dictCode: 'CurrentMaterial',
      },
      remark: {title: '备注', order: 1, view: 'text', type: 'string',},
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
