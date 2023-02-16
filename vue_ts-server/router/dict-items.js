const express = require('express');
// 创建路由对象
const router = express.Router();
const dictItemHandler = require('../router_handler/dict-items');

// 添加字典项
router.post('/addDictItem', dictItemHandler.addDictItem);
// 修改字典项
router.post('/editDictItem', dictItemHandler.editDictItem);
// 删除字典项
router.post('/delDictItem', dictItemHandler.deleteDictItem);
// 根据id获取用户信息接口
router.get('/getDictItem', dictItemHandler.getOneDictItem);

module.exports = router;
