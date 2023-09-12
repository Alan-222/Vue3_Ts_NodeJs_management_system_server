let joi = require('joi')
// 允许未设置规则的未知键
joi = joi.defaults((schema) =>
  schema.options({
    allowUnknown: true
  })
)
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// 角色名的校验规则
const role_name = joi.string().min(1).max(10).required().messages({
  'string.empty': '角色名必填',
  'any.required': '角色名必填',
  'string.max': '角色名长度不能超过10'
})
// 定义 id, nickname, emial 的验证规则
const role_id = joi.number().integer().min(0).required().messages({
  'any.required': '角色id必填',
  'number.base': '角色id为数字',
  'number.min': '角色id最少1位'
})
const remark = joi.string()
const status = joi.string().valid('0', '1')
// 角色id数组
const role_ids = [
  joi.array().items(joi.number()).required(),
  joi.number().messages({
    'any.required': '角色id必填',
    'array.base': '角色id为数组'
  })
]
// 分页参数
const pageSize = joi.number().required()
const currentPage = joi.number().required()

// 添加角色的验证规则对象
exports.add_role_schema = joi.object().keys({
  // 对res.body对象进行验证
  role_name,
  remark,
  status
})
// 获取角色列表的验证规则对象
exports.get_role_list_schema = joi.object().keys({
  pageSize,
  currentPage,
  role_name: joi.string().min(1).max(10)
})
// 修改角色的验证规则对象
exports.edit_role_schema = joi.object().keys({
  role_name,
  remark,
  status
})
// 删除角色的验证规则对象
exports.delete_role_schema = joi.object().keys({
  role_ids
})
// 获取单角色的验证规则对象
exports.get_role_schema = joi.object().keys({
  // 对query参数进行验证
  role_id
})
