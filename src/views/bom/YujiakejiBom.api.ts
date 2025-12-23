import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/bom/yujiakejiBom/list',
  save='/bom/yujiakejiBom/add',
  edit='/bom/yujiakejiBom/edit',
  deleteOne = '/bom/yujiakejiBom/delete',
  deleteBatch = '/bom/yujiakejiBom/deleteBatch',
  importExcel = '/bom/yujiakejiBom/importExcel',
  exportXls = '/bom/yujiakejiBom/exportXls',
  yujiakejiBomDetailList = '/bom/yujiakejiBom/queryYujiakejiBomDetailByMainId',
  audit = '/bom/yujiakejiBom/audit',
  materialByCode="/materials/yujiakejiMaterials/queryByCode"
}
/**
 * 根据物料编码查询物料
 * @param materialCode 物料编码
 */
export const getMaterialByCodeApi = (materialCode) => {
  return defHttp.get({
    url: Api.materialByCode,
    params: { materialCode }
  });
};
/**
 * 审核/反审URL
 * @param params
 */
export const getAuditUrl = Api.audit;
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 查询子表数据
 * @param params
 */
export const yujiakejiBomDetailList = Api.yujiakejiBomDetailList;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
