/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : react-antd-admin

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 11/11/2023 16:11:01
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
INSERT INTO `dict_items` VALUES (1, '1', '启用', '1', '状态可用', 1, '1', 'Alan', '2023-08-30 09:54:48', '2023-08-30 09:36:44');
INSERT INTO `dict_items` VALUES (3, '1', '禁用', '0', '状态不可用', 2, '1', 'Alan', '2023-08-30 09:56:09', '2023-08-30 09:36:47');
INSERT INTO `dict_items` VALUES (4, '2', '显示', '0', '状态标记为显示', 1, '1', 'Alan', '2023-08-30 09:56:52', '2023-08-30 14:51:40');
INSERT INTO `dict_items` VALUES (5, '2', '隐藏', '1', '状态为隐藏', 2, '1', 'Alan', '2023-08-30 09:57:08', '2023-08-30 14:51:36');
INSERT INTO `dict_items` VALUES (8, '3', '目录', 'C', '容纳菜单的目录', 1, '1', 'Alan', '2023-08-30 08:58:38', '2023-08-30 09:45:14');
INSERT INTO `dict_items` VALUES (9, '3', '菜单', 'M', '菜单', 2, '1', 'Alan', '2023-08-30 08:59:19', '2023-08-30 09:11:14');
INSERT INTO `dict_items` VALUES (10, '3', '按钮', 'B', '菜单里的按钮', 3, '1', 'Alan', '2023-08-30 08:59:37', '2023-08-30 09:11:18');

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
INSERT INTO `dicts` VALUES (1, '状态', 'status', '定义状态类型字典', '1', 'Alan', '2023-08-30 17:13:14', '2023-08-30 11:32:52');
INSERT INTO `dicts` VALUES (2, '显示状态', 'hidden', '定义显隐状态类型字典', '1', 'Alan', '2023-08-30 17:18:27', '2023-08-30 17:25:31');
INSERT INTO `dicts` VALUES (3, '权限类型', 'authType', '定义权限类型（菜单、按钮）等', '1', 'Alan', '2023-08-30 08:57:37', NULL);

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `menu_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` int NOT NULL COMMENT '上级ID',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型（\'B\'：按钮，‘M’：菜单，‘C’：目录）',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由组件',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `redirect` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '跳转地址',
  `permission` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `hidden` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '隐藏',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, 40, '用户管理', 1, 'M', 'user', '/System/User', 'user', NULL, NULL, '0', '2023-09-08 11:27:44', '2023-08-24 09:49:46');
INSERT INTO `menus` VALUES (2, 40, '角色管理', 2, 'M', 'peoples', '/System/Role', 'role', NULL, NULL, '0', '2023-09-08 11:28:04', '2023-08-24 09:50:23');
INSERT INTO `menus` VALUES (3, 40, '权限管理', 3, 'M', 'list', '/System/Auth', 'menu', NULL, NULL, '0', '2023-09-13 16:08:02', '2023-08-24 09:50:46');
INSERT INTO `menus` VALUES (40, 0, '系统管理', 1, 'C', 'system', 'Layout', 'system', '/system/user', NULL, '0', NULL, '2023-09-05 17:29:59');
INSERT INTO `menus` VALUES (41, 1, '用户新增', 1, 'B', NULL, NULL, NULL, NULL, 'system:user:add', '0', NULL, '2023-09-06 10:48:31');
INSERT INTO `menus` VALUES (42, 1, '用户编辑', 2, 'B', NULL, NULL, NULL, NULL, 'system:user:edit', '0', NULL, '2023-09-06 10:49:00');
INSERT INTO `menus` VALUES (43, 1, '用户删除', 3, 'B', NULL, NULL, NULL, NULL, 'system:user:del', '0', NULL, '2023-09-06 10:49:17');
INSERT INTO `menus` VALUES (44, 2, '角色新增', 1, 'B', NULL, NULL, NULL, NULL, 'system:role:add', '0', '2023-09-07 11:35:25', '2023-09-07 11:30:19');
INSERT INTO `menus` VALUES (45, 2, '角色编辑', 2, 'B', NULL, NULL, NULL, NULL, 'system:role:edit', '0', NULL, '2023-09-07 11:30:43');
INSERT INTO `menus` VALUES (46, 2, '角色删除', 3, 'B', NULL, NULL, NULL, NULL, 'system:role:del', '0', NULL, '2023-09-07 11:31:14');
INSERT INTO `menus` VALUES (47, 2, '分配角色权限', 4, 'B', NULL, NULL, NULL, NULL, 'system:role:assignAuth', '0', NULL, '2023-09-07 11:32:30');
INSERT INTO `menus` VALUES (48, 3, '权限新增', 1, 'B', NULL, NULL, NULL, NULL, 'system:auth:add', '0', NULL, '2023-09-07 11:33:05');
INSERT INTO `menus` VALUES (49, 3, '权限编辑', 2, 'B', NULL, NULL, NULL, NULL, 'system:auth:edit', '0', NULL, '2023-09-07 11:33:23');
INSERT INTO `menus` VALUES (50, 3, '权限删除', 3, 'B', NULL, NULL, NULL, NULL, 'system:auth:del', '0', NULL, '2023-09-07 11:33:41');
INSERT INTO `menus` VALUES (51, 1, '重置密码', 4, 'B', NULL, NULL, NULL, NULL, 'system:user:resetPwd', '0', NULL, '2023-09-07 15:33:38');
INSERT INTO `menus` VALUES (52, 0, '自定义多级菜单', 2, 'C', 'tree-table', 'Layout', 'custom', '/custom/test1', NULL, '0', NULL, '2023-09-08 11:16:09');
INSERT INTO `menus` VALUES (53, 52, '测试菜单一', 1, 'M', 'example', '/Custom/Test1', 'test1', NULL, NULL, '0', NULL, '2023-09-08 14:45:13');
INSERT INTO `menus` VALUES (54, 52, '测试菜单二', 1, 'C', 'example', 'Layout', 'test2', '/custom/test2/test3', NULL, '0', NULL, '2023-09-08 14:46:37');
INSERT INTO `menus` VALUES (55, 54, '测试菜单三', 1, 'M', 'example', '/Custom/Test2/Test3', 'test3', NULL, NULL, '0', NULL, '2023-09-08 14:47:19');

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
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, '管理员', '我是一个管理员', '1', NULL, '2023-08-24 09:42:44');
INSERT INTO `roles` VALUES (2, '观察员', '我是一个观察员', '1', NULL, '2023-08-24 09:43:10');
INSERT INTO `roles` VALUES (3, '测试员', '我是一个测试员', '1', NULL, '2023-08-24 09:43:27');
INSERT INTO `roles` VALUES (19, '测试角色', '该角色仅供测试使用', '1', '2023-09-04 15:51:36', '2023-09-04 15:45:12');

-- ----------------------------
-- Table structure for roles_menus
-- ----------------------------
DROP TABLE IF EXISTS `roles_menus`;
CREATE TABLE `roles_menus`  (
  `role_menu_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色菜单联合表id',
  `role_id` int NOT NULL COMMENT '角色id',
  `menu_id` int NOT NULL COMMENT '菜单id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`role_menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of roles_menus
-- ----------------------------
INSERT INTO `roles_menus` VALUES (1, 1, 1, '2023-08-24 09:53:09');
INSERT INTO `roles_menus` VALUES (2, 1, 2, '2023-08-24 09:53:30');
INSERT INTO `roles_menus` VALUES (3, 1, 3, '2023-08-24 09:53:40');
INSERT INTO `roles_menus` VALUES (81, 1, 40, '2023-09-05 17:38:09');
INSERT INTO `roles_menus` VALUES (82, 1, 41, '2023-09-06 16:52:29');
INSERT INTO `roles_menus` VALUES (83, 1, 42, '2023-09-06 16:52:29');
INSERT INTO `roles_menus` VALUES (84, 1, 43, '2023-09-06 16:52:29');
INSERT INTO `roles_menus` VALUES (85, 2, 40, '2023-09-06 17:33:05');
INSERT INTO `roles_menus` VALUES (86, 2, 1, '2023-09-06 17:33:05');
INSERT INTO `roles_menus` VALUES (87, 2, 2, '2023-09-06 17:33:05');
INSERT INTO `roles_menus` VALUES (88, 2, 3, '2023-09-06 17:33:05');
INSERT INTO `roles_menus` VALUES (89, 1, 44, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (90, 1, 45, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (91, 1, 46, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (92, 1, 47, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (93, 1, 48, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (94, 1, 49, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (95, 1, 50, '2023-09-07 11:34:32');
INSERT INTO `roles_menus` VALUES (96, 1, 51, '2023-09-07 15:34:00');
INSERT INTO `roles_menus` VALUES (97, 1, 52, '2023-09-08 14:47:59');
INSERT INTO `roles_menus` VALUES (98, 1, 53, '2023-09-08 14:47:59');
INSERT INTO `roles_menus` VALUES (99, 1, 54, '2023-09-08 14:47:59');
INSERT INTO `roles_menus` VALUES (100, 1, 55, '2023-09-08 14:47:59');

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
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Alan', '$2a$10$X8gGVZ/RN7wNGNxd0kyYW.yUSJW2XHNxA9lAAUlB4qkVKDaX41hiG', '艾伦儿', 'alan@gmail.com', 'public\\avatar\\pikaqiu_1.jpg', '1', '2023-08-24 10:15:32', '2023-11-11 14:33:08');

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
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users_roles
-- ----------------------------
INSERT INTO `users_roles` VALUES (1, 1, 1, '2023-08-24 09:44:48');
INSERT INTO `users_roles` VALUES (2, 2, 1, '2023-08-24 09:44:58');

SET FOREIGN_KEY_CHECKS = 1;
