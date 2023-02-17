let joi = require('joi');
// 允许未设置规则的未知键
joi = joi.defaults((schema) =>
  schema.options({
    allowUnknown: true
  })
);
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// 定义参数的校验规则
const id = joi.number().integer().min(0).required();
const dict_id = joi.number().integer().min(0).required();
const item_text = joi.string().required();
const item_value = [joi.number().min(0).required(), joi.string().required()];
const description = joi.string();
const sort_order = joi.number().integer().min(0);
const status = joi.string().valid('0', '1');
// 字典项id数组
const dictItem_ids = [joi.array().items(joi.number()).required(), joi.number().required()];

// 添加字典项的验证规则对象
exports.add_dictItem_schema = joi.object().keys({
  // 对res.body对象进行验证
  dict_id,
  item_text,
  item_value,
  description,
  sort_order,
  status
});
// 修改字典项的验证规则对象
exports.edit_dictItem_schema = joi.object().keys({
  dict_id,
  item_text,
  item_value,
  description,
  sort_order,
  status
});
// 删除字典项的验证规则对象
exports.delete_dictItem_schema = joi.object().keys({
  dictItem_ids
});
// 获取单字典项的验证规则对象
exports.get_dictItem_schema = joi.object().keys({
  // 对query参数进行验证
  id
});
