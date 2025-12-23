import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '科目编码',
    align: 'left',
    dataIndex: 'subjectCode'
  },
  {
    title: '科目名称',
    align: 'center',
    dataIndex: 'subjectName'
  },
  {
    title: '科目类型',
    align: 'center',
    dataIndex: 'subjectType_dictText'
  },
  {
    title: '借贷方向',
    align: 'center',
    dataIndex: 'direction_dictText'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "科目编码",
    field: "subjectCode",
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "科目名称",
    field: "subjectName",
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "科目类型",
    field: "subjectType",
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_subject_type"
    }
    //colProps: {span: 6},
  },
  {
    label: "借贷方向",
    field: "direction",
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_direction_flag"
    }
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '父级节点',
    field: 'pid',
    component: 'JTreeSelect',
    componentProps: {
      dict: "fin_subject_config,subject_code,id",
      pidField: "pid",
      pidValue: "0",
      hasChildField: "has_child",
    },
  },
  {
    label: '科目编码',
    field: 'subjectCode',
    component: 'Input',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入科目编码!'},
      ];
    },
  },
  {
    label: '科目名称',
    field: 'subjectName',
    component: 'Input',
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请输入科目名称!'},
      ];
    },
  },
  {
    label: '科目类型',
    field: 'subjectType',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_subject_type"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择科目类型!'},
      ];
    },
  },
  {
    label: '借贷方向',
    field: 'direction',
    component: 'JSearchSelect',
    componentProps: {
      dict: "dict_direction_flag"
    },
    dynamicRules: ({model, schema}) => {
      return [
        {required: true, message: '请选择借贷方向!'},
      ];
    },
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
  subjectCode: {title: '科目编码', order: 1, view: 'text', type: 'string',},
  subjectName: {title: '科目名称', order: 2, view: 'text', type: 'string',},
  subjectType: {title: '科目类型', order: 3, view: 'number', type: 'number',},
  direction: {title: '借贷方向', order: 4, view: 'number', type: 'number',},
};


/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
