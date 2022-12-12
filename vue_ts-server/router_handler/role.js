const RoleModel = require('../model/roles');
// 导入需要的验证规则对象
const {
  get_role_list_schema,
  add_role_schema,
  edit_role_schema,
  delete_role_schema,
  get_role_schema
} = require('../schema/role');

// 获取角色列表接口
exports.getList = (req, res) => {
  const { value, error } = get_role_list_schema.validate(req.query);
  if (error) throw error;
  // 接收前端参数
  let { pageSize, currentPage } = value;
  // 默认值
  limit = pageSize ? Number(pageSize) : 10;
  offset = currentPage ? Number(currentPage) : 1;
  offset = (offset - 1) * pageSize;
  let where = {};
  let role_name = value.role_name;
  if (role_name) {
    where.role_name = { [Op.like]: `%${role_name}%` };
  }
  RoleModel.findAndCountAll({
    offset: offset,
    limit: limit,
    where: where
  }).then(function (roles) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: roles
    });
  });
};

exports.getAllRole = (req, res) => {
  RoleModel.findAll({
    where: {
      status: 1
    }
  }).then(function (roles) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: roles
    });
  });
};

exports.getRoleResource = (req, res) => {
  const role_id = req.query.role_id;
  RoleModel.getResource(role_id).then(function (resource) {
    if (!resource) {
      return res.send({
        code: 1,
        message: '获取角色权限失败',
        data: null
      });
    }
    return res.send({
      code: 0,
      message: '获取角色权限成功',
      data: resource
    });
  });
};

exports.updateRoleResource = (req, res) => {
  const role_id = req.query.role_id;
  const data = req.body;
  RoleModel.updateResource(role_id, data.menu_ids).then(function (resource) {
    if (resource !== true) {
      return res.send({
        code: 1,
        message: '修改失败',
        data: null
      });
    }
    return res.send({
      code: 0,
      message: '修改成功',
      data: resource
    });
  });
};

// 添加角色接口
exports.addRole = (req, res) => {
  const { value, error } = add_role_schema.validate(req.body);
  if (error) throw error;
  RoleModel.create(value).then(function (role) {
    if (!role) {
      return res.send({
        code: 1,
        message: '创建失败',
        data: null
      });
    }
    return res.send({
      code: 0,
      message: '创建成功',
      data: role
    });
  });
};
// 编辑角色接口
exports.editRole = (req, res) => {
  const { value, error } = edit_role_schema.validate(req.body);
  if (error) throw error;
  value.update_time = new Date();
  RoleModel.update(value, {
    where: req.query
  }).then(function (role) {
    if (!role) {
      return res.send({
        code: 1,
        message: '修改失败',
        data: null
      });
    }
    return res.send({
      code: 0,
      message: '修改成功',
      data: role
    });
  });
};
// 删除角色接口
exports.deleteRole = (req, res) => {
  const { value, error } = delete_role_schema.validate(req.body);
  if (error) throw error;
  const role_ids = value.role_ids;
  RoleModel.delRole(role_ids || []).then(function (role) {
    if (role !== true) {
      return res.send({
        code: 1,
        message: '删除失败',
        data: null
      });
    }
    return res.send({
      code: 0,
      message: '删除成功',
      data: role
    });
  });
};
// 获取单角色接口
exports.getOneRole = (req, res) => {
  const { value, error } = get_role_schema.validate(req.query);
  if (error) throw error;
  RoleModel.findOne({
    where: value
  }).then(function (role) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: role
    });
  });
};
