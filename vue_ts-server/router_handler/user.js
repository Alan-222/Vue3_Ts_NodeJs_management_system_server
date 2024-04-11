/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 引入用户模型
const UsersModel = require('../model/users')
const RolesModel = require('../model/roles')
const { Op } = require('sequelize')
// 引入加密模块
const bcrypt = require('bcryptjs')

// 1. 导入验证表单数据的中间件
let joi = require('joi')
// 2. 导入需要的验证规则对象
const {
  user_login_schema,
  add_user_schema,
  get_list,
  update_user_schema,
  edit_password_schema,
  get_userInfoById_schema,
  delete_user_schema
} = require('../schema/user')
// 引入生成图形验证码库
const svgCaptcha = require('svg-captcha')
// 引入封装好的redis
const redis = require('../utils/redis.js')
// 引入封装好的token模块和配置信息
const { addToken, decodedToken, verifyToken } = require('../utils/token')
const key = require('../config/index')
/**
 * 获取图形验证码
 */
exports.getCheckCode = (req, res) => {
  // 生成验证码，获取catcha，有{data,text}两个属性，data为svg格式图片、text为验证码
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1lpaqd',
    color: true,
    noise: 6,
    background: '#aead5b',
    height: 32,
    width: 100
  })
  // 验证码键和缓存时间
  const uuid = req.query.uuid
  const effectTime = 10 * 60
  // 测试
  // console.log(captcha);
  // 存入redis
  redis
    .setKey(uuid, captcha.text.toLowerCase(), effectTime)
    .then((result) => {
      if (result) {
        res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
        res.send({
          code: 0,
          message: '获取验证码成功',
          data: captcha.data
        })
      }
    })
    .catch((err) => {
      console.log(err)
      return res.send({
        code: 1,
        message: '验证码获取失败',
        data: null
      })
    })
}
/**
 * 登录路由
 */
exports.login = async (req, res, next) => {
  // 验证入参，错误时抛出以捕获
  const { error, value } = user_login_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  // 验证验证码
  const { username, password, checkCode, uuid } = value
  const captcha = await redis.getKey(uuid)
  if (!captcha) {
    return res.send({
      code: 1,
      message: '图形验证码已过期，请点击图片刷新'
    })
  }
  if (checkCode.toLowerCase() !== captcha.toLowerCase()) {
    return res.send({
      code: 1,
      message: '图形验证码不正确，请重新输入'
    })
  }
  // // 查询数据库用户信息是否存在密码是否正确
  UsersModel.findOne({
    where: {
      username: username
    }
  }).then((result) => {
    if (!result) {
      /*
       * 返回体格式
       * code：0为成功、1为失败
       * message：接口信息描述
       * data：接口数据
       */
      return res.send({
        code: 1,
        message: '用户不存在',
        data: null
      })
    } else if (result.status === '0') {
      return res.send({
        code: 1,
        message: '帐号已停用',
        data: ''
      })
    } else {
      const compareResult = bcrypt.compareSync(password, result.password)
      if (compareResult) {
        // 用浏览器可识别的固定格式生成token
        const token =
          'Bearer ' + addToken({ id: result.user_id, username: result.username }, key.jwtSecretKey, key.secretKeyExpire)
        // 生成长时refreshToken
        const refreshToken = addToken(
          { id: result.user_id, username: result.username },
          key.jwtRefrechSecretKey,
          key.refreshSerectKeyExpire
        )
        return res.send({
          code: 0,
          message: '登录成功',
          data: {
            token,
            refreshToken
          }
        })
      } else {
        return res.send({
          code: 1,
          message: '密码错误',
          data: ''
        })
      }
    }
  })
}
/**
 * 添加用户
 */
exports.addUser = (req, res, next) => {
  // 验证入参，错误时抛出以捕获
  const { error, value } = add_user_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  // 查询是否存在相同用户名
  UsersModel.findAll({
    where: {
      username: value.username
    }
  }).then((result) => {
    if (result && result.length)
      return res.send({
        code: 1,
        message: '用户名被占用，请更换后重试！',
        data: null
      })
    else {
      const password = value.password
      // 加密
      value.password = bcrypt.hashSync(password, 10)
      const result = UsersModel.addUser(value)
      result.then(function (ret) {
        if (ret === true) {
          return res.send({
            code: 0,
            message: '新增成功',
            data: ret
          })
        } else {
          return res.send({
            code: 1,
            message: ret,
            data: null
          })
        }
      })
    }
  })
}

/**
 * 刷新token
 */
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body
  // 验证 refreshToken 1:通过
  let _res = verifyToken(refreshToken)
  if (_res === 1) {
    // 对refreshToken进行解码获得id、username
    let { id, username } = decodedToken(refreshToken)
    // 续签生成新的token
    const token = 'Bearer ' + addToken({ id, username }, key.jwtSecretKey, key.secretKeyExpire)
    // 续签长时token
    const newRefreshToken = addToken({ id, username }, key.jwtRefrechSecretKey, key.refreshSerectKeyExpire)
    res.send({
      code: 0,
      message: '获取成功',
      data: {
        token,
        refreshToken: newRefreshToken
      }
    })
  } else {
    res.send({
      code: 500,
      message: _res.message
    })
  }
}
/**
 * 获取用户列表
 */
exports.getList = (req, res, next) => {
  const { value, error } = get_list.validate(req.query)
  if (error) {
    return next(error)
  }
  // 接收前端参数
  let { pageSize, currentPage } = req.query
  // 默认值
  limit = pageSize ? Number(pageSize) : 10
  offset = currentPage ? Number(currentPage) : 1
  offset = (offset - 1) * pageSize
  const { username, nickname, email, status } = value
  let where = {}
  if (username) where.username = { [Op.like]: `%${username}%` }
  if (nickname) where.nickname = nickname
  if (email) where.email = email
  if (status === '0' || status === '1') where.status = { [Op.eq]: status }

  UsersModel.findAndCountAll({
    attributes: { exclude: ['password'] },
    include: [{ model: RolesModel }], // 预先加载角色模型
    distinct: true,
    offset: offset,
    limit: limit,
    where: where
  }).then(function (users) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: users
    })
  })
}
/**
 * 修改用户
 */
exports.editUser = (req, res, next) => {
  const user_id = req.params.id
  const { value, error } = update_user_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  UsersModel.findAll({
    where: {
      [Op.and]: {
        user_id: {
          [Op.ne]: user_id
        },
        username: {
          [Op.eq]: value.username
        }
      }
    }
  }).then((result) => {
    if (result && result.length)
      return res.send({
        code: 1,
        message: '用户名被占用，请更换后重试！',
        data: null
      })
    else {
      const result = UsersModel.updateUser(user_id, req.body)
      result.then(function (ret) {
        if (ret === true) {
          return res.send({
            code: 0,
            message: '修改成功',
            data: ret
          })
        } else {
          return res.send({
            code: 1,
            message: ret,
            data: null
          })
        }
      })
    }
  })
}
/**
 * 删除用户
 */
exports.deleteUser = (req, res, next) => {
  const { value, error } = delete_user_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  const user_ids = value.user_ids
  if ((user_ids.length && user_ids.includes(1)) || user_ids === 1)
    return res.send({
      code: 1,
      message: '超级管理员测试账号不可删除',
      data: null
    })
  UsersModel.delUser(user_ids || []).then(function (user) {
    if (user !== true) {
      return res.send({
        code: 1,
        message: '删除失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '删除成功',
      data: user
    })
  })
}
/**
 * 重置密码
 */
exports.editPassword = (req, res, next) => {
  const { value, error } = edit_password_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  if (value.password !== value.repassword) {
    return res.send({
      code: 1,
      message: '两次密码输入不一致',
      data: null
    })
  }
  const user_id = value.user_id
  const old_password = value.old_password
  UsersModel.findOne({ where: { user_id: user_id } }).then(function (user) {
    if (!user) {
      return res.send({
        code: 1,
        message: '用户不存在',
        data: null
      })
    }
    // 判断密码是否与数据库密码一致
    const compareResult = bcrypt.compareSync(old_password, user.password)
    if (!compareResult) {
      return res.send({
        code: 1,
        message: '原密码不正确',
        data: null
      })
    }
    const data = {
      password: bcrypt.hashSync(value.password, 10),
      update_time: new Date()
    }
    const result = UsersModel.update(data, {
      where: {
        user_id: user_id
      }
    })
    result.then(function (ret) {
      if (ret) {
        return res.send({
          code: 0,
          message: '修改成功',
          data: ret
        })
      } else {
        return res.send({
          code: 1,
          message: ret,
          data: null
        })
      }
    })
  })
}
/**
 * 根据id获取用户信息接口
 */
exports.getUserinfoById = (req, res, next) => {
  const { value, error } = get_userInfoById_schema.validate(req.params)
  if (error) {
    return next(error)
  }
  let user_id = value.user_id
  UsersModel.findOne({
    attributes: { exclude: ['password'] },
    include: [{ model: RolesModel }], // 预先加载角色模型
    where: {
      user_id: user_id
    }
  }).then((user) => {
    if (!user) {
      res.send({
        code: 1,
        message: '用户不存在',
        data: null
      })
    } else {
      res.send({
        code: 0,
        message: '获取成功',
        data: user
      })
    }
  })
}
