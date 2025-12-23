<template>
  <div>
    <BasicTable
      @register="registerTable"
      :rowSelection="rowSelection"
      :expandedRowKeys="expandedRowKeys"
      @expand="handleExpand"
    >
      <!--表格标题-->
      <template #tableTitle>

        <a-button type="primary" @click="onExportXls">导出</a-button>
        <j-upload-button type="primary" @click="onImportXls">导入</j-upload-button>
        <super-query :config="superQueryConfig" @search="handleSuperQuery"/>
      </template>

      <!--操作列-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"
                     :dropDownActions="getDropDownAction(record)"/>
      </template>

      <!--展开行-->
      <template #expandedRowRender="{ record }">
        <BasicTable
          bordered
          size="middle"
          rowKey="id"
          :canResize="false"
          :columns="innerColumns"
          :dataSource="record.detailData"
          :pagination="false"
        />
      </template>
    </BasicTable>

    <InvMaterialVoucherModal @register="registerModal" @success="handleSuccess"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue';
import {BasicTable, TableAction} from '/@/components/Table';
import {useListPage} from '/@/hooks/system/useListPage';
import {useModal} from '/@/components/Modal';
import InvMaterialVoucherModal from './components/InvMaterialVoucherModal.vue';
import {columns,innerColumns, searchFormSchema, superQuerySchema} from './InvMaterialVoucher.data';
import {
  list,
  deleteOne,
  batchDelete,
  getImportUrl,
  getExportUrl,
  listDetail
} from './InvMaterialVoucher.api';

const queryParam = reactive<any>({});
const {prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
  tableProps: {
    title: '物料凭证',
    api: list,
    columns,
    canResize: false,
    showActionColumn :false,
    formConfig: {
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToTime: [['docTime', ['docTime_begin', 'docTime_end'], 'YYYY-MM-DD']],
    },
    actionColumn: {width: 120, fixed: 'right'},
    beforeFetch: (params) => Object.assign(params, queryParam),
  },
  exportConfig: {name: '物料凭证', url: getExportUrl, params: queryParam},
  importConfig: {url: getImportUrl, success: handleSuccess},
});

const [registerTable, {reload}, {rowSelection, selectedRowKeys}] = tableContext;
const [registerModal, {openModal}] = useModal();


// 高级查询配置
const superQueryConfig = reactive(superQuerySchema);

// 展开行 key
const expandedRowKeys = ref<number[]>([]);

/**
 * 高级查询事件
 */
function handleSuperQuery(params: any) {
  Object.assign(queryParam, params);
  reload();
}

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {isUpdate: false, showFooter: true});
}

/**
 * 编辑事件
 */
function handleEdit(record: any) {
  openModal(true, {record, isUpdate: true, showFooter: true});
}

/**
 * 删除事件
 */
async function handleDelete(record: any) {
  await deleteOne({id: record.id}, handleSuccess);
}

/**
 * 批量删除
 */
async function batchHandleDelete() {
  await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
}

/**
 * 成功回调
 */
function handleSuccess() {
  selectedRowKeys.value = [];
  reload();
}

/**
 * 操作栏
 */
function getTableAction(record: any) {
  return [{label: '编辑', onClick: () => handleEdit(record)}];
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record: any) {
  return [
    {label: '详情', onClick: () => handleDetail(record)},
    {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: () => handleDelete(record),
        placement: 'topLeft'
      },
    },
  ];
}

/** * 详情 */
function handleDetail(record: Recordable) {
  openModal(true, {record, isUpdate: true, showFooter: false,});
}

/**
 * 展开行事件（点击左侧三角）
 */
function handleExpand(expanded: boolean, record: any) {
  if (expanded) {
    // 展开时才请求明细

    if (!record.detailData) {
      record.detailData = [];
      listDetail({id: record.id}).then((res: any) => {
        record.detailData=res
        // 展开行
        if (!expandedRowKeys.value.includes(record.id)) {
          expandedRowKeys.value.push(record.id);
        }
      });
    } else {
      // 已有明细直接展开
      if (!expandedRowKeys.value.includes(record.id)) {
        expandedRowKeys.value.push(record.id);
      }
    }
  } else {
    // 收起行
    const index = expandedRowKeys.value.indexOf(record.id);
    if (index > -1) expandedRowKeys.value.splice(index, 1);
  }
}
window.handleDetail=handleDetail;
</script>
