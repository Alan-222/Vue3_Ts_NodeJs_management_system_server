const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const UsersRolesModel = require('./users-roles')
const MenusModel = require('./menus')
const RolesMenusModel = require('./roles-menus')
const tools = require('../utils/tools')
// 定义表的模型
const RolesModel = sequelize.define('roles', {
  role_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: {
    type: Sequelize.STRING(255)
  },
  remark: {
    type: Sequelize.STRING(255)
  },
  status: {
    type: Sequelize.CHAR,
    defaultValue: '1'
  },
  // menu_ids: {
  //   type: Sequelize.TEXT,
  //   set(val) {
  //     this.setDataValue('menu_ids', val && val.length > 0 ? JSON.stringify(val) : JSON.stringify([]));
  //   },
  //   get() {
  //     return this.getDataValue('menu_ids') ? JSON.parse(this.getDataValue('menu_ids')) : [];
  //   }
  // },
  // buttons: {
  //   type: Sequelize.TEXT,
  //   set(val) {
  //     this.setDataValue('buttons', val && val.length > 0 ? JSON.stringify(val) : JSON.stringify([]));
  //   },
  //   get() {
  //     return this.getDataValue('buttons') ? JSON.parse(this.getDataValue('buttons')) : [];
  //   }
  // },
  update_time: {
    type: Sequelize.DATE,
    get() {
      return this.getDataValue('update_time')
        ? moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss')
        : null
    }
  },
  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})

// 删除角色的方法
RolesModel.delRole = async function (role_ids) {
  const t = await sequelize.transaction()
  try {
    // 删除角色表中角色id数组的角色
    await RolesModel.destroy({
      where: { role_id: role_ids }
    })
    // 删除用户角色表中角色id数组的角色记录
    await UsersRolesModel.destroy({
      where: { role_id: role_ids }
    })
    // 删除角色权限表中角色id数组的角色记录
    await RolesMenusModel.destroy({
      where: { role_id: role_ids }
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return false
  }
}

// 获取角色资源（分按钮与菜单）的方法
RolesModel.getResource = async function (role_id) {
  const t = await sequelize.transaction()
  try {
    // 所有按钮的父id集合（重复）
    // let all_parent_ids = [];
    // 所有按钮的父id（去除重复）
    // let parent_ids = [];
    // 所有按钮的id
    let permIds = []
    // 返回的按钮集合 按钮项格式为{menu_id:xx,btns:[xx,xx]}
    // const buttons = [];
    // 获取角色菜单表中此角色id的所有记录
    const roleResource = await RolesMenusModel.findAll({
      where: { role_id: role_id }
    })
    // 获得此角色id的拥有权限id
    const all_menu_ids = roleResource.map((resource) => {
      return resource.menu_id
    })
    // 从菜单表获取此角色id拥有权限详细信息
    const all_menus = await MenusModel.findAll({
      where: { menu_id: all_menu_ids },
      attributes: ['menu_id', 'parent_id', 'type', 'permission']
    })
    // 获取目录及菜单的id数组
    const menu__arr = all_menus.filter((menu) => menu.type === 'M' || menu.type === 'C')
    const menu_ids = menu__arr.map((menu) => menu.menu_id)
    // 将获取的按钮数组转化为对应的格式
    const btn_arr = all_menus.filter((menu) => menu.type === 'B')
    btn_arr.forEach((button) => {
      // all_parent_ids.push(button.parent_id);
      permIds.push(button.menu_id)
    })
    // parent_ids = Array.from(new Set(all_parent_ids));
    // parent_ids.forEach((item) => {
    //   buttons.push({ menu_id: item, btns: [] });
    // });
    // btn_arr.forEach((button) => {
    //   parent_ids.forEach((parent) => {
    //     if (button.parent_id === parent) {
    //       buttons.forEach((item) => {
    //         if (item.menu_id === parent) item.btns.push(button.permission);
    //       });
    //     }
    //   });
    // });
    t.commit()
    return {
      menu_ids,
      // buttons,
      permIds
    }
  } catch (e) {
    t.rollback()
    return false
  }
}
// 获取角色所有资源
RolesModel.getAuth = async function (role_id) {
  const t = await sequelize.transaction()
  try {
    const roleResource = await RolesMenusModel.findAll({
      where: { role_id: role_id }
    })
    const roleAuth = roleResource.map((item) => item.menu_id)
    t.commit()
    return roleAuth
  } catch (e) {
    t.rollback()
    return false
  }
}
// 更新角色资源的方法
RolesModel.updateResource = async function (role_id, menu_ids) {
  const t = await sequelize.transaction()
  try {
    // 先找到所有角色菜单表对应角色id的拥有权限
    const roles_menus = await RolesMenusModel.findAll({
      where: { role_id: role_id }
    })
    // 将表中获得的权限id转换为数组
    const old_menu_ids = roles_menus.map(function (item) {
      return item.menu_id
    })
    // 新加的权限加到角色菜单表中
    const add_menu_ids = tools.minustArr(menu_ids, old_menu_ids)
    const add_roles_menus = add_menu_ids.map(function (menu_id) {
      return { role_id: role_id, menu_id: menu_id }
    })
    await RolesMenusModel.bulkCreate(add_roles_menus)
    // 删除的权限从角色菜单表删除
    const del_menu_ids = tools.minustArr(old_menu_ids, menu_ids)
    if (del_menu_ids && del_menu_ids.length > 0) {
      await RolesMenusModel.destroy({
        where: {
          role_id: role_id,
          menu_id: del_menu_ids
        }
      })
    }
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}
// 建立关联
RolesModel.belongsToMany(MenusModel, {
  through: {
    model: RolesMenusModel
  },
  foreignKey: 'role_id',
  otherKey: 'menu_id'
})

module.exports = RolesModel
