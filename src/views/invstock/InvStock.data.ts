import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {rules} from '/@/utils/helper/validator';
import {render} from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '仓库',
    align: "center",
    dataIndex: 'warehouseCode_dictText'
  },
  {
    title: '库位',
    align: "center",
    dataIndex: 'locationCode'
  },
  {
    title: '物料编码',
    align: "center",
    dataIndex: 'materialCode'
  },
  {
    title: '物料',
    align: "center",
    dataIndex: 'materialCode_dictText'
  },
  {
    title: '规格',
    align: "center",
    dataIndex: 'specifications'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'unit_dictText'
  },
  {
    title: '总数量',
    align: "center",
    dataIndex: 'totalQty'
  },
  {
    title: '锁定数量',
    align: "center",
    dataIndex: 'lockedQty'
  },
  {
    title: '库存数量',
    align: "center",
    dataIndex: 'stockQty'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "仓库",
    field: 'warehouseCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentWarehouse",
    },
    //colProps: {span: 6},
  },
  {
    label: "物料",
    field: 'materialCode',
    component: 'JSearchSelect',
    componentProps: {
      dict: "CurrentMaterial",
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '仓库',
    field: 'warehouseCode',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: ""
    },

  },
  {
    label: '库位',
    field: 'locationCode',
    component: 'Input',
  },
  {
    label: '物料',
    field: 'materialCode',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: ""
    },
  },
  {
    label: '总数量',
    field: 'totalQty',
    component: 'InputNumber',
  },
  {
    label: '锁定数量',
    field: 'lockedQty',
    component: 'InputNumber',
  },
  {
    label: '库存数量',
    field: 'stockQty',
    component: 'InputNumber',
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
  warehouseCode: {title: '仓库', order: 0, view: 'list', type: 'string',},
  locationCode: {title: '库位', order: 1, view: 'text', type: 'string',},
  materialCode: {title: '物料', order: 2, view: 'list', type: 'string',},
  totalQty: {title: '总数量', order: 3, view: 'number', type: 'number',},
  lockedQty: {title: '锁定数量', order: 4, view: 'number', type: 'number',},
  stockQty: {title: '库存数量', order: 5, view: 'number', type: 'number',},
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
