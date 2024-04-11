const RoleModel = require('../model/roles')
// 导入需要的验证规则对象
const {
  get_role_list_schema,
  add_role_schema,
  edit_role_schema,
  delete_role_schema,
  get_role_schema
} = require('../schema/role')
// 导入op模块
const { Op } = require('sequelize')
// 获取角色列表接口
exports.getList = (req, res, next) => {
  const { value, error } = get_role_list_schema.validate(req.query)
  if (error) {
    return next(error)
  }
  // 接收前端参数
  let { pageSize, currentPage } = value
  // 默认值
  limit = pageSize ? Number(pageSize) : 10
  offset = currentPage ? Number(currentPage) : 1
  offset = (offset - 1) * pageSize
  let where = {}
  const { role_name, status } = value
  if (role_name) where.role_name = { [Op.like]: `%${role_name}%` }

  if (status) where.status = { [Op.eq]: status }

  RoleModel.findAndCountAll({
    offset: offset,
    limit: limit,
    where: where
  }).then(function (roles) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: roles
    })
  })
}

exports.getAllRole = (req, res) => {
  RoleModel.findAll({
    where: {
      status: '1'
    }
  }).then(function (roles) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: roles
    })
  })
}

exports.getRoleResource = (req, res) => {
  const role_id = req.query.role_id
  RoleModel.getResource(role_id).then(function (resource) {
    if (!resource) {
      return res.send({
        code: 1,
        message: '获取角色权限失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '获取角色权限成功',
      data: resource
    })
  })
}

exports.getRoleAuth = (req, res) => {
  const role_id = req.query.role_id
  RoleModel.getAuth(role_id).then(function (resource) {
    if (!resource) {
      return res.send({
        code: 1,
        message: '获取角色权限失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '获取角色权限成功',
      data: resource
    })
  })
}

exports.updateRoleResource = (req, res) => {
  const role_id = req.query.role_id
  const data = req.body
  const all_ids = data.all_ids ?? data.menu_ids.concat(data.permIds)
  RoleModel.updateResource(role_id, all_ids).then(function (resource) {
    if (resource !== true) {
      return res.send({
        code: 1,
        message: '修改失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '修改成功',
      data: resource
    })
  })
}

// 添加角色接口
exports.addRole = (req, res, next) => {
  const { value, error } = add_role_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  RoleModel.create(value).then(function (role) {
    if (!role) {
      return res.send({
        code: 1,
        message: '创建失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '创建成功',
      data: role
    })
  })
}
// 编辑角色接口
exports.editRole = (req, res, next) => {
  const { value, error } = edit_role_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  value.update_time = new Date()
  RoleModel.update(value, {
    where: req.query
  }).then(function (role) {
    if (!role) {
      return res.send({
        code: 1,
        message: '修改失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '修改成功',
      data: role
    })
  })
}
// 删除角色接口
exports.deleteRole = (req, res, next) => {
  const { value, error } = delete_role_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  const role_ids = value.role_ids
  if ((role_ids.length && role_ids.includes(1)) || role_ids === 1)
    return res.send({
      code: 1,
      message: '超级管理员角色不可删除',
      data: null
    })
  RoleModel.delRole(role_ids || []).then(function (role) {
    if (role !== true) {
      return res.send({
        code: 1,
        message: '删除失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '删除成功',
      data: role
    })
  })
}
// 获取单角色接口
exports.getOneRole = (req, res, next) => {
  const { value, error } = get_role_schema.validate(req.query)
  if (error) {
    return next(error)
  }
  RoleModel.findOne({
    where: value
  }).then(function (role) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: role
    })
  })
}
