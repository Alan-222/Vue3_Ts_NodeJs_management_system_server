/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : vue_ts-database

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 08/01/2024 19:47:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dict_items
-- ----------------------------
DROP TABLE IF EXISTS `dict_items`;
CREATE TABLE `dict_items`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `dict_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字典id',
  `item_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典项文本',
  `item_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '字典项键',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `sort_order` int NULL DEFAULT 0 COMMENT '排序',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '状态（1启用 0不启用）',
  `create_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index_table_dict_id`(`dict_id` ASC) USING BTREE,
  INDEX `index_table_sort_order`(`sort_order` ASC) USING BTREE,
  INDEX `index_table_dict_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dict_items
-- ----------------------------
INSERT INTO `dict_items` VALUES (1, '1', '启用', '1', '状态可用', 1, '1', 'Alan', '2023-02-13 09:54:48', '2023-02-15 09:36:44');
INSERT INTO `dict_items` VALUES (3, '1', '禁用', '0', '状态不可用', 2, '1', 'Alan', '2023-02-13 09:56:09', '2023-02-15 09:36:47');
INSERT INTO `dict_items` VALUES (4, '2', '显示', '0', '状态标记为显示', 1, '1', 'Alan', '2023-02-13 09:56:52', '2023-02-16 14:51:40');
INSERT INTO `dict_items` VALUES (5, '2', '隐藏', '1', '状态为隐藏', 2, '1', 'Alan', '2023-02-13 09:57:08', '2023-02-16 14:51:36');
INSERT INTO `dict_items` VALUES (8, '4', '目录', 'C', '容纳菜单的目录', 1, '1', 'Alan', '2023-02-17 08:58:38', '2023-02-17 09:45:14');
INSERT INTO `dict_items` VALUES (9, '4', '菜单', 'M', '菜单', 2, '1', 'Alan', '2023-02-17 08:59:19', '2023-02-17 09:11:14');
INSERT INTO `dict_items` VALUES (10, '4', '按钮', 'B', '菜单里的按钮', 3, '1', 'Alan', '2023-02-17 08:59:37', '2023-02-17 09:11:18');

-- ----------------------------
-- Table structure for dicts
-- ----------------------------
DROP TABLE IF EXISTS `dicts`;
CREATE TABLE `dicts`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `dict_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典名称',
  `dict_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典编码',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '字典状态，0为禁用，1为启用\r\n\r\n',
  `create_by` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `indextable_dict_code`(`dict_code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dicts
-- ----------------------------
INSERT INTO `dicts` VALUES (1, '状态', 'status', '定义状态类型字典', '1', 'Alan', '2023-02-10 17:13:14', '2023-02-14 11:32:52');
INSERT INTO `dicts` VALUES (2, '显示状态', 'hidden', '定义显隐状态类型字典', '1', 'Alan', '2023-02-10 17:18:27', '2023-02-10 17:25:31');
INSERT INTO `dicts` VALUES (4, '权限类型', 'authType', '定义权限类型（菜单、按钮）等', '1', 'Alan', '2023-02-17 08:57:37', NULL);

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `menu_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int NOT NULL COMMENT '上级ID',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由名称',
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由组件',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `redirect` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转地址',
  `permission` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `hidden` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '隐藏',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 0, '系统管理', 0, 'C', 'component', 'System', 'Layout', '/system', '/system/user', NULL, '0', '2023-02-17 09:44:53', '2022-12-05 14:36:30');
INSERT INTO `menus` VALUES (2, 1, '用户管理', 1, 'M', 'user', 'User', '/system/user', '/system/user', NULL, NULL, '0', '2022-12-05 15:37:43', '2022-12-05 15:19:51');
INSERT INTO `menus` VALUES (3, 1, '角色管理', 2, 'M', 'peoples', 'Role', '/system/role', '/system/role', NULL, NULL, '0', '2022-12-05 15:38:27', '2022-12-05 15:28:13');
INSERT INTO `menus` VALUES (4, 1, '菜单管理', 3, 'M', 'list', 'Menu', '/system/menu', '/system/menu', NULL, NULL, '0', '2022-12-05 15:39:15', '2022-12-05 15:29:02');
INSERT INTO `menus` VALUES (19, 0, '测试菜单', 1, 'C', 'system', 'CeshiMenu', 'Layout', '/ceshiMenu', '/ceshiMenu/ceshiMenu4', NULL, '0', '2023-02-06 17:07:09', '2022-12-06 16:45:38');
INSERT INTO `menus` VALUES (25, 19, '测试弹窗表单', 2, 'M', 'edit', 'Test2', '/ceshiMenu/ceshiMenu2', '/ceshiMenu/ceshiMenu2', NULL, NULL, '0', '2023-02-07 15:09:13', '2022-12-05 14:36:30');
INSERT INTO `menus` VALUES (26, 2, '用户新增', 1, 'B', NULL, NULL, NULL, NULL, NULL, 'system:user:add', '0', NULL, '2022-12-22 16:08:02');
INSERT INTO `menus` VALUES (27, 2, '用户编辑', 2, 'B', NULL, NULL, NULL, NULL, NULL, 'system:user:edit', '0', '2022-12-22 16:09:41', '2022-12-22 16:08:34');
INSERT INTO `menus` VALUES (28, 2, '用户查询', 3, 'B', NULL, NULL, NULL, NULL, NULL, 'system:user:query', '0', '2022-12-22 16:09:34', '2022-12-22 16:09:29');
INSERT INTO `menus` VALUES (29, 2, '用户删除', 4, 'B', NULL, NULL, NULL, NULL, NULL, 'system:user:del', '0', NULL, '2022-12-22 16:13:26');
INSERT INTO `menus` VALUES (30, 3, '角色新增', 1, 'B', NULL, NULL, NULL, NULL, NULL, 'system:role:add', '0', NULL, '2022-12-22 16:13:47');
INSERT INTO `menus` VALUES (31, 3, '角色编辑', 2, 'B', NULL, NULL, NULL, NULL, NULL, 'system:role:edit', '0', '2022-12-22 16:14:54', '2022-12-22 16:14:20');
INSERT INTO `menus` VALUES (32, 3, '角色查询', 3, 'B', NULL, NULL, NULL, NULL, NULL, 'system:role:query', '0', NULL, '2022-12-22 16:14:49');
INSERT INTO `menus` VALUES (33, 3, '角色删除', 4, 'B', NULL, NULL, NULL, NULL, NULL, 'system:role:del', '0', '2022-12-22 16:17:49', '2022-12-22 16:17:31');
INSERT INTO `menus` VALUES (34, 4, '菜单新增', 1, 'B', NULL, NULL, NULL, NULL, NULL, 'system:menu:add', '0', '2022-12-22 16:17:39', '2022-12-22 16:17:31');
INSERT INTO `menus` VALUES (35, 4, '菜单编辑', 2, 'B', NULL, NULL, NULL, NULL, NULL, 'system:menu:edit', '0', '2022-12-22 16:17:39', '2022-12-22 16:17:31');
INSERT INTO `menus` VALUES (36, 4, '菜单查询', 3, 'B', NULL, NULL, NULL, NULL, NULL, 'system:menu:query', '0', '2022-12-22 16:17:39', '2022-12-22 16:17:31');
INSERT INTO `menus` VALUES (37, 4, '菜单删除', 4, 'B', NULL, NULL, NULL, NULL, NULL, 'system:menu:del', '0', '2022-12-22 16:17:39', '2022-12-22 16:17:31');
INSERT INTO `menus` VALUES (38, 19, '测试表单', 1, 'M', 'form', 'Test1', '/ceshiMenu/ceshiMenu1', '/ceshiMenu/ceshiMenu1', NULL, NULL, '0', '2023-02-07 15:08:58', '2022-12-07 15:35:46');
INSERT INTO `menus` VALUES (39, 1, '字典管理', 4, 'M', 'dict', 'dict', '/system/dict', '/system/dict', NULL, NULL, '0', NULL, '2023-02-13 15:17:39');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `role_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '状态',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`role_id`, `role_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '管理员', '我是一个管理员', '1', '2023-02-17 09:44:42', '2022-12-01 10:11:05');
INSERT INTO `roles` VALUES (2, '观察员', '我是一个观察员', '1', '2022-12-06 09:17:47', '2022-12-01 10:12:58');
INSERT INTO `roles` VALUES (4, '测试员', '仅为测试员使用', '1', '2023-01-31 16:13:06', '2022-12-01 10:20:49');
INSERT INTO `roles` VALUES (8, '测试一下', '简单测试一下拉', '1', '2023-02-09 09:10:48', '2023-02-02 15:13:18');

-- ----------------------------
-- Table structure for roles_menus
-- ----------------------------
DROP TABLE IF EXISTS `roles_menus`;
CREATE TABLE `roles_menus`  (
  `role_menu_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色菜单联合表id',
  `role_id` int NOT NULL COMMENT '角色id',
  `menu_id` int NOT NULL COMMENT '菜单id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`role_menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles_menus
-- ----------------------------
INSERT INTO `roles_menus` VALUES (7, 2, 19, '2022-12-06 16:47:36');
INSERT INTO `roles_menus` VALUES (13, 1, 1, '2022-12-08 11:11:57');
INSERT INTO `roles_menus` VALUES (14, 1, 2, '2022-12-08 11:11:57');
INSERT INTO `roles_menus` VALUES (15, 1, 3, '2022-12-08 11:11:57');
INSERT INTO `roles_menus` VALUES (16, 1, 4, '2022-12-08 11:11:57');
INSERT INTO `roles_menus` VALUES (17, 1, 19, '2022-12-08 11:14:26');
INSERT INTO `roles_menus` VALUES (29, 2, 1, '2022-12-20 14:35:51');
INSERT INTO `roles_menus` VALUES (30, 2, 2, '2022-12-20 14:35:51');
INSERT INTO `roles_menus` VALUES (31, 2, 3, '2022-12-20 14:35:51');
INSERT INTO `roles_menus` VALUES (32, 2, 4, '2022-12-20 14:35:51');
INSERT INTO `roles_menus` VALUES (34, 2, 25, '2022-12-22 16:28:31');
INSERT INTO `roles_menus` VALUES (35, 2, 28, '2022-12-22 16:28:31');
INSERT INTO `roles_menus` VALUES (36, 2, 32, '2022-12-22 16:28:31');
INSERT INTO `roles_menus` VALUES (37, 2, 36, '2022-12-22 16:28:31');
INSERT INTO `roles_menus` VALUES (38, 8, 1, '2023-02-02 15:20:10');
INSERT INTO `roles_menus` VALUES (44, 8, 3, '2023-02-02 15:20:22');
INSERT INTO `roles_menus` VALUES (46, 8, 2, '2023-02-02 15:20:59');
INSERT INTO `roles_menus` VALUES (47, 8, 26, '2023-02-02 15:20:59');
INSERT INTO `roles_menus` VALUES (49, 8, 28, '2023-02-02 15:53:09');
INSERT INTO `roles_menus` VALUES (50, 8, 29, '2023-02-02 15:53:09');
INSERT INTO `roles_menus` VALUES (51, 8, 30, '2023-02-02 15:53:09');
INSERT INTO `roles_menus` VALUES (52, 8, 32, '2023-02-02 15:53:09');
INSERT INTO `roles_menus` VALUES (53, 8, 33, '2023-02-02 15:53:09');
INSERT INTO `roles_menus` VALUES (57, 8, 19, '2023-02-03 10:58:11');
INSERT INTO `roles_menus` VALUES (61, 8, 31, '2023-02-03 10:58:34');
INSERT INTO `roles_menus` VALUES (64, 1, 38, '2023-02-06 17:12:10');
INSERT INTO `roles_menus` VALUES (65, 1, 25, '2023-02-06 17:12:10');
INSERT INTO `roles_menus` VALUES (66, 8, 27, '2023-02-09 09:10:53');
INSERT INTO `roles_menus` VALUES (67, 1, 26, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (68, 1, 27, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (69, 1, 28, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (70, 1, 29, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (71, 1, 30, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (72, 1, 31, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (73, 1, 32, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (74, 1, 33, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (75, 1, 34, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (76, 1, 35, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (77, 1, 36, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (78, 1, 37, '2023-02-09 09:31:01');
INSERT INTO `roles_menus` VALUES (79, 2, 38, '2023-02-09 09:31:23');
INSERT INTO `roles_menus` VALUES (80, 1, 39, '2023-02-13 15:17:58');

-- ----------------------------
-- Table structure for user_logs
-- ----------------------------
DROP TABLE IF EXISTS `user_logs`;
CREATE TABLE `user_logs`  (
  `user_log_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户ID',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录IP',
  `ua` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ua标识',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
  PRIMARY KEY (`user_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_logs
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT 'id唯一字段',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱\r\n',
  `user_pic` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '用户头像',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '用户状态： 0为停用、1启用\r\n',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, 'Bob', '', '鲍勃', 'Bob@qq.com', 'public\\avatar\\龙二_2.jpg', '1', '2022-11-24 09:22:01', '2023-02-17 09:44:26');
INSERT INTO `users` VALUES (7, 'Alan', '$2a$10$yeltPgYjMVbwo2/Z.frtVewGVrv2lggcu3ZuhYPzIxadAjaNUVTv2', '艾伦', 'alan@qq.com', 'public\\avatar\\龙二_2.jpg', '1', '2022-12-01 14:32:12', '2022-12-01 14:36:53');
INSERT INTO `users` VALUES (9, 'Panda', '$2a$10$j9oVibmYrB/b0XGYn9wGCuU6M1K5mWzv9ABCHETmAGRf/5vZbJ4C6', '熊猫', 'panda@gmail.com', NULL, '1', '2022-12-01 14:54:42', '2023-02-09 09:09:59');
INSERT INTO `users` VALUES (10, 'Monkey', '$2a$10$y4mCtHy/oK1LPVr3Jc5M5O8vkbehZrqRlDIJWhlMA0vnrB7dhrHnS', NULL, NULL, NULL, '1', '2022-12-19 09:58:39', '2023-02-03 15:12:13');
INSERT INTO `users` VALUES (13, 'jacky', '$2a$10$8xczY1Nv7eCIdpoNrqV82OboD0CwLValQ2oviLYfEz0tPQjYyTBoy', NULL, NULL, NULL, '0', '2023-02-09 09:10:33', NULL);

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles`  (
  `user_role_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL COMMENT '角色ID',
  `user_id` int NOT NULL COMMENT '用户ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`user_role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users_roles
-- ----------------------------
INSERT INTO `users_roles` VALUES (1, 1, 7, '2022-12-01 14:32:12');
INSERT INTO `users_roles` VALUES (2, 2, 7, '2022-12-01 14:36:53');
INSERT INTO `users_roles` VALUES (5, 1, 9, '2022-12-01 14:54:42');
INSERT INTO `users_roles` VALUES (6, 1, 2, '2022-12-08 10:57:49');
INSERT INTO `users_roles` VALUES (7, 2, 2, '2022-12-08 16:09:48');
INSERT INTO `users_roles` VALUES (8, 2, 10, '2022-12-19 09:58:39');
INSERT INTO `users_roles` VALUES (12, 2, 13, '2023-02-09 09:10:33');

SET FOREIGN_KEY_CHECKS = 1;
