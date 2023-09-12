const express = require('express')
// 创建路由对象
const router = express.Router()
const handler = require('../router_handler/menu')

// 获取菜单列表
router.get('/listMenu', handler.getMenuList)
// 获取菜单项
router.get('/listMenuOptions', handler.getMenuOptions)
// 获取菜单项（无按钮和菜单区分）
router.get('/listAuthOptions', handler.getAuthOptions)
// 添加菜单
router.post('/addMenu', handler.addMenu)
// 修改菜单
router.post('/editMenu', handler.editMenu)
// 删除菜单
router.post('/delMenu', handler.deleteMenu)
// 根据id获取菜单信息接口
router.get('/getMenu', handler.getOneMenu)

module.exports = router
