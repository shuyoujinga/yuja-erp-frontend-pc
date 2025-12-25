-- 注意：该页面对应的前台目录为views/prdreport文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025122512548650550', NULL, '生产报工', '/prdreport/prdReportList', 'prdreport/PrdReportList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512548650551', '2025122512548650550', '添加生产报工', NULL, NULL, 0, NULL, NULL, 2, 'prdreport:prd_report:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512548650552', '2025122512548650550', '编辑生产报工', NULL, NULL, 0, NULL, NULL, 2, 'prdreport:prd_report:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512548650553', '2025122512548650550', '删除生产报工', NULL, NULL, 0, NULL, NULL, 2, 'prdreport:prd_report:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512548650554', '2025122512548650550', '批量删除生产报工', NULL, NULL, 0, NULL, NULL, 2, 'prdreport:prd_report:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512548650555', '2025122512548650550', '导出excel_生产报工', NULL, NULL, 0, NULL, NULL, 2, 'prdreport:prd_report:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512548650556', '2025122512548650550', '导入excel_生产报工', NULL, NULL, 0, NULL, NULL, 2, 'prdreport:prd_report:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:54:55', NULL, NULL, 0, 0, '1', 0);