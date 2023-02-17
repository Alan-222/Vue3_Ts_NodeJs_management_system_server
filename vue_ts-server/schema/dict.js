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
// 字典名的校验规则
const dict_name = joi.string().min(1).max(10).required();
// 定义其它参数的校验规则
const id = joi.number().integer().min(0).required();
const dict_code = joi.string().required();
const description = joi.string();
const status = joi.string().valid('0', '1');
// 字典id数组
const dict_ids = [joi.array().items(joi.number()).required(), joi.number()];
// 分页参数
const pageSize = joi.number().required();
const currentPage = joi.number().required();

// 添加字典的验证规则对象
exports.add_dict_schema = joi.object().keys({
  // 对res.body对象进行验证
  dict_name,
  dict_code,
  description,
  status
});
// 获取字典列表的验证规则对象
exports.get_dict_list_schema = joi.object().keys({
  pageSize,
  currentPage,
  dict_name: joi.string().min(1).max(10)
});
// 修改字典的验证规则对象
exports.edit_dict_schema = joi.object().keys({
  dict_name,
  dict_code,
  description,
  status
});
// 删除字典的验证规则对象
exports.delete_dict_schema = joi.object().keys({
  dict_ids
});
// 获取单字典的验证规则对象
exports.get_dict_schema = joi.object().keys({
  // 对query参数进行验证
  id
});
// 用名称获取单字典的验证规则对象
exports.get_dict_by_code_schema = joi.object().keys({
  // 对query参数进行验证
  dict_code
});
