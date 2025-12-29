import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '分类',
    align: "center",
    dataIndex: 'materialCategory_dictText',
  },
  {
    title: '名称',
    align: "center",
    dataIndex: 'materialName'
  },
  {
    title: '编码',
    align: "center",
    dataIndex: 'materialCode',
    sorter: true,
  },
  {
    title: '规格',
    align: "center",
    dataIndex: 'specifications'
  },
  {
    title: '仓位',
    align: "center",
    dataIndex: 'stock'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'unit',
    customRender: ({ text }) => {
      return render.renderDict(text, 'dict_materials_unit');
    },

  },
  {
    title: '单价',
    align: "center",
    dataIndex: 'unitPrice',
    sorter: true,
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
    label: "名称",
    field: 'materialName',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "编码",
    field: 'materialCode',
    component: 'Input',
    //colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '分类',
    field: 'materialCategory',
    component: 'JCategorySelect',
    componentProps:{
      pcode: "name", //TODO back和事件未添加，暂时有问题
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入分类!'},
             ];
    },
  },
  {
    label: '名称',
    field: 'materialName',
    component: 'Input',
  },
  {
    label: '编码',
    field: 'materialCode',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'specifications',
    component: 'Input',
  },
  {
    label: '仓位',
    field: 'stock',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '单价',
    field: 'unitPrice',
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
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
  materialCategory: {title: '分类',order: 0,view: 'cat_tree', type: 'string',pcode: 'name',},
  materialName: {title: '名称',order: 1,view: 'text', type: 'string',},
  materialCode: {title: '编码',order: 2,view: 'text', type: 'string',},
  specifications: {title: '规格',order: 3,view: 'text', type: 'string',},
  stock: {title: '仓位',order: 4,view: 'text', type: 'string',},
  unit: {title: '单位',order: 5,view: 'text', type: 'string',},
  unitPrice: {title: '单价',order: 6,view: 'text', type: 'string',},
  remark: {title: '备注',order: 7,view: 'text', type: 'string',},
};
