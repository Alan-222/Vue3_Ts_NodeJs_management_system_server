const express = require('express')
// 创建路由对象
const router = express.Router()
const dashboardHandler = require('../router_handler/dashboard')

// 获取各实体数量
router.get('/getCount', dashboardHandler.getCount)
// 获取模块菜单数量
router.get('/getModuleCount',dashboardHandler.getModuleMenuCount)
module.exports = router
