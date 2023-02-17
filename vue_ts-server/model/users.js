const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('./init');
const RolesModel = require('./roles');
const UsersRolesModel = require('./users-roles');
// 引入工具方法
const tools = require('../utils/tools');
// 定义表的模型 define方法第一个参数为表名，第二个参数为表字段对象
const UsersModel = sequelize.define('users', {
  user_id: {
    // 数据类型
    type: Sequelize.INTEGER,
    // 主键
    primaryKey: true,
    // 自增
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(255)
  },
  nickname: {
    type: Sequelize.STRING(255)
  },
  email: {
    type: Sequelize.STRING(255)
  },
  password: {
    type: Sequelize.CHAR(32)
  },
  user_pic: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.CHAR,
    defaultValue: '1'
  },
  update_time: {
    type: Sequelize.DATE,
    // 格式化日期时间戳
    get() {
      return this.getDataValue('update_time')
        ? moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss')
        : null;
    }
  },
  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
});
// 添加用户的方法
UsersModel.addUser = async function (data) {
  // 首先,我们开始一个事务并将其保存到变量中
  const t = await sequelize.transaction();
  try {
    // 然后,我们进行一些调用以将此事务作为参数传递:
    // 添加用户
    const user = await UsersModel.create(data);
    // 遍历前端传来的用户角色id并添加到用户角色表
    const users_roles = data.role_ids.map(function (role_id) {
      return {
        user_id: user.user_id,
        role_id: role_id
      };
    });
    await UsersRolesModel.bulkCreate(users_roles);
    // 我们提交事务.
    t.commit();
    return true;
  } catch (e) {
    // 如果执行到达此行,则抛出错误.
    // 我们回滚事务.
    t.rollback();
    return e.message;
  }
};
// 修改用户的方法
UsersModel.updateUser = async function (user_id, data) {
  const t = await sequelize.transaction();
  try {
    // 获得修改时间
    data.update_time = new Date();
    // 先更新用户
    await UsersModel.update(data, {
      where: {
        user_id: user_id
      }
    });
    // 再得到用户角色表中此用户的角色id
    const users_roles = await UsersRolesModel.findAll({
      where: { user_id: user_id }
    });
    // 将表中获得的角色id转换为数组
    const role_ids = users_roles.map(function (item) {
      return item.role_id;
    });
    // 新加的角色加到用户角色表中
    const add_role_ids = tools.minustArr(data.role_ids, role_ids);
    const add_users_roles = add_role_ids.map(function (role_id) {
      return { user_id: user_id, role_id: role_id };
    });
    await UsersRolesModel.bulkCreate(add_users_roles);
    // 删除的角色从用户角色表删除
    const del_role_ids = tools.minustArr(role_ids, data.role_ids);
    if (del_role_ids && del_role_ids.length > 0) {
      await UsersRolesModel.destroy({
        where: {
          user_id: user_id,
          role_id: del_role_ids
        }
      });
    }
    t.commit();
    return true;
  } catch (e) {
    t.rollback();
    return e.message;
  }
};
// 删除用户的方法
UsersModel.delUser = async function (user_ids) {
  const t = await sequelize.transaction();
  try {
    await UsersModel.destroy({
      where: { user_id: user_ids }
    });
    await UsersRolesModel.destroy({
      where: { user_id: user_ids }
    });
    t.commit();
    return true;
  } catch (e) {
    t.rollback();
    return false;
  }
};
// 建立关联
UsersModel.belongsToMany(RolesModel, {
  through: {
    model: UsersRolesModel
  },
  foreignKey: 'user_id',
  otherKey: 'role_id'
});
// 导出用户映射模型
module.exports = UsersModel;
