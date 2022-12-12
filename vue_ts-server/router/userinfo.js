const express = require('express');
// 创建路由对象
const router = express.Router();
const handler = require('../router_handler/userinfo');

// 获取登录用户的基本信息
router.get('/userinfo', handler.getUserinfo);
// 更新登录用户的基本信息
router.post('/updateUserinfo', handler.updateUserInfo);
// 重置密码接口
router.post('/updatePwd', handler.updatepwd);
// 更新头像接口
router.post('/updateAvatar', handler.updateAvatar);

module.exports = router;
