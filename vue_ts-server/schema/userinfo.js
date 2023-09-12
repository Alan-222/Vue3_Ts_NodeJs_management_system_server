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

// 用户名的校验规则
const username = joi.string().alphanum().min(1).max(10).required()
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

const nickname = joi.string()
const email = joi.string().email()
const role_ids = joi.array().items(joi.number()).required()

exports.update_userinfo_schema = joi.object().keys({
  username: joi.string().alphanum().min(1).max(10),
  nickname,
  email
})
exports.update_password_schema = joi.object().keys({
  old_password: password,
  password: joi.not(joi.ref('old_password')).concat(password),
  repassword: joi.ref('password')
})
