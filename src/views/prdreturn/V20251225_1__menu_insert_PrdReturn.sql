-- 注意：该页面对应的前台目录为views/prdreturn文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025122512305210080', NULL, '生产退料', '/prdreturn/prdReturnList', 'prdreturn/PrdReturnList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512305210081', '2025122512305210080', '添加生产退料', NULL, NULL, 0, NULL, NULL, 2, 'prdreturn:prd_return:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512305210082', '2025122512305210080', '编辑生产退料', NULL, NULL, 0, NULL, NULL, 2, 'prdreturn:prd_return:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512305210083', '2025122512305210080', '删除生产退料', NULL, NULL, 0, NULL, NULL, 2, 'prdreturn:prd_return:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512305210084', '2025122512305210080', '批量删除生产退料', NULL, NULL, 0, NULL, NULL, 2, 'prdreturn:prd_return:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512305210085', '2025122512305210080', '导出excel_生产退料', NULL, NULL, 0, NULL, NULL, 2, 'prdreturn:prd_return:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025122512305210086', '2025122512305210080', '导入excel_生产退料', NULL, NULL, 0, NULL, NULL, 2, 'prdreturn:prd_return:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-12-25 12:30:08', NULL, NULL, 0, 0, '1', 0);