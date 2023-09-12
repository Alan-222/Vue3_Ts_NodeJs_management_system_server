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
// 用户id的校验规则
const user_id = joi.number().min(0).required()
// 用户名的校验规则
const username = joi.string().alphanum().min(1).max(10).required().messages({
  'string.empty': '用户名必填',
  'any.required': '用户名必填',
  'string.alphanum': '用户名只能包含a-zA-Z0-9',
  'string.max': '用户名长度不能超过10'
})
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
  .messages({
    'string.empty': '密码必填',
    'any.required': '密码必填',
    'string.pattern.base': '密码为6-12位字符'
  })
const checkCode = joi.string().alphanum().min(4).max(4).required().messages({
  'string.empty': '验证码必填',
  'any.required': '验证码必填',
  'string.alphanum': '验证码格式错误',
  'string.max': '验证码长度不能超过4'
})
const uuid = joi.number().required()
const nickname = joi.string()
const email = joi.string().email()
const status = joi.string().valid('0', '1')
const pageSize = joi.number().required()
const currentPage = joi.number().required()
const role_ids = joi.array().items(joi.number()).required().messages({
  'any.required': '角色必填',
  'array.base': '角色id为数组'
})
const user_ids = [
  joi.array().items(joi.number()).required(),
  joi.number().messages({
    'any.required': '用户id必填'
  })
]
// 登录表单的验证规则对象
exports.user_login_schema = joi.object().keys({
  username,
  password,
  checkCode,
  uuid
})
// 添加用户接口
exports.add_user_schema = joi.object().keys({
  username,
  password,
  status,
  role_ids
})
// 获取用户列表接口
exports.get_list = joi.object().keys({
  pageSize,
  currentPage,
  status
})
// 更新用户接口
exports.update_user_schema = joi.object().keys({
  username: joi.string().alphanum().min(1).max(10),
  status,
  nickname,
  email,
  role_ids
})
// 重置密码
exports.edit_password_schema = joi.object().keys({
  user_id,
  // 使用 password 这个规则，验证 req.body.oldPwd 的值
  old_password: password,
  // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
  // 解读：
  // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
  // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
  // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
  password: joi.not(joi.ref('old_password')).concat(password),
  repassword: joi.ref('password')
})
// 根据id获取用户信息
exports.get_userInfoById_schema = joi.object().keys({
  user_id
})
// 删除用户
exports.delete_user_schema = joi.object().keys({
  user_ids
})
