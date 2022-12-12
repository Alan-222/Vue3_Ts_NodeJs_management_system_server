const express = require('express');
// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user');

// 获取用户列表
router.get('/list', userHandler.getList);
// 修改用户信息
router.post('/editUser/:id', userHandler.editUser);
// 登录
router.post('/login', userHandler.login);
// 添加用户接口
router.post('/addUser', userHandler.addUser);
// 获取图形验证码
router.get('/checkCode', userHandler.getCheckCode);
// 刷新token
router.post('/refreshToken', userHandler.refreshToken);
// 删除用户
router.post('/delUser', userHandler.deleteUser);
// 重置密码
router.post('/editPwd', userHandler.editPassword);
// 根据id获取用户信息接口
router.get('/queryUserInfo/:user_id', userHandler.getUserinfoById);
// 将路由对象共享出去
module.exports = router;
