const express = require('express')
// 创建路由对象
const router = express.Router()
const roleHandler = require('../router_handler/role')

// 分页获取角色列表
router.get('/listRole', roleHandler.getList)
// 获取所有角色
router.get('/allRole', roleHandler.getAllRole)
// 添加角色
router.post('/addRole', roleHandler.addRole)
// 获取角色资源（区分按钮、菜单）
router.get('/roleResource', roleHandler.getRoleResource)
// 获取角色所有资源
router.get('/roleAuth', roleHandler.getRoleAuth)
// 更新角色资源
router.post('/updateRoleResource', roleHandler.updateRoleResource)
// 修改角色
router.post('/editRole', roleHandler.editRole)
// 删除角色
router.post('/delRole', roleHandler.deleteRole)
// 根据id获取用户信息接口
router.get('/getRole', roleHandler.getOneRole)

module.exports = router
