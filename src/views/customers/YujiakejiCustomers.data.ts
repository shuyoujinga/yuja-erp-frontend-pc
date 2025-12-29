import {BasicColumn} from '/src/components/Table';
import {FormSchema} from '/src/components/Table';
import {rules} from '/src/utils/helper/validator';
import {render} from '/src/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '分类',
    align: "center",
    dataIndex: 'category',
    customRender: ({ text }) => {
      return render.renderDict(text, 'dict_customers_type');
    },
  },
  {
    title: '编码',
    align: "center",
    dataIndex: 'code',
    sorter: true,
  },
  {
    title: '客户名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '简称',
    align: "center",
    dataIndex: 'shortName'
  },
  {
    title: '联系人',
    align: "center",
    dataIndex: 'contactPerson'
  },
  {
    title: '电话',
    align: "center",
    dataIndex: 'phone'
  },
  {
    title: '传真',
    align: "center",
    dataIndex: 'fax'
  },
  {
    title: '地址',
    align: "center",
    dataIndex: 'address'
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
    label: "客户名称",
    field: 'name',
    component: 'JInput',
    //colProps: {span: 6},
  },
  {
    label: "分类",
    field: 'category',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_customers_type"
    },
    //colProps: {span: 6},
  },
  {
    label: "编码",
    field: 'code',
    component: 'JInput',
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入客户名称!'},
      ];
    },
  },
  {
    label: '简称',
    field: 'shortName',
    component: 'Input',
  },
  {
    label: '分类',
    field: 'category',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_customers_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择客户分类!'},
      ];
    },
  },
  {
    label: '编码',
    field: 'code',
    component: 'Input',
    componentProps: {
      disabled: true
    },
  },

  {
    label: '联系人',
    field: 'contactPerson',
    component: 'Input',
  },
  {
    label: '电话',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '传真',
    field: 'fax',
    component: 'Input',
  },
  {
    label: '地址',
    field: 'address',
    component: 'Input',
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

// 高级查询数据
export const superQuerySchema = {
  category: {title: '分类', order: 0, view: 'list', type: 'string',},
  code: {title: '编码', order: 1, view: 'text', type: 'string',},
  name: {title: '客户名称', order: 2, view: 'text', type: 'string',},
  shortName: {title: '简称', order: 3, view: 'text', type: 'string',},
  contactPerson: {title: '联系人', order: 4, view: 'text', type: 'string',},
  phone: {title: '电话', order: 5, view: 'text', type: 'string',},
  fax: {title: '传真', order: 6, view: 'text', type: 'string',},
  address: {title: '地址', order: 7, view: 'text', type: 'string',},
  remark: {title: '备注', order: 8, view: 'text', type: 'string',},
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
