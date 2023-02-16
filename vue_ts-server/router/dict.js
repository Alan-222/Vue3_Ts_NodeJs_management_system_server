const express = require('express');
// 创建路由对象
const router = express.Router();
const dictHandler = require('../router_handler/dict');

// 分页获取字典列表
router.get('/listDict', dictHandler.getList);
// 添加字典
router.post('/addDict', dictHandler.addDict);
// 修改字典
router.post('/editDict', dictHandler.editDict);
// 删除字典
router.post('/delDict', dictHandler.deleteDict);
// 根据id获取字典信息接口
router.get('/getDict', dictHandler.getOneDict);
// 根据名称获取字典信息接口
router.get('/getDictByName', dictHandler.getDictByName);
module.exports = router;
