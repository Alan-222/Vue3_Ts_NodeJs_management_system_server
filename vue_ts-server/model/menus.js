const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const tools = require('../utils/tools')
const RolesMenusModel = require('./roles-menus')
const { Op } = Sequelize
// 定义表的模型
const MenusModel = sequelize.define('menus', {
  menu_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  parent_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: {
    type: Sequelize.STRING(255),
    defaultValue: ''
  },
  sort: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: {
    type: Sequelize.CHAR(1),
    defaultValue: 'M'
  },
  icon: {
    type: Sequelize.STRING(255)
  },
  component: {
    type: Sequelize.STRING(255)
  },
  path: {
    type: Sequelize.STRING(255)
  },
  permission: {
    type: Sequelize.STRING(255)
  },
  redirect: {
    type: Sequelize.STRING(255)
  },
  hidden: {
    type: Sequelize.TINYINT(1),
    defaultValue: 0
  },
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
// 获得权限的树状数据结构
MenusModel.getListTree = async function (params = {}) {
  let menus = []
  let where = {}
  // 查询数据库获得元数据
  const { title, type, path, menu_id } = params
  if (title)
    where.title = {
      [Op.like]: `%${title}%`
    }
  if (type) where.type = type
  if (path) where.path = path
  if (menu_id) where.menu_id = menu_id
  menus = await MenusModel.findAll({
    where: where,
    order: [['sort']]
  })
  // 将元数据转换为单纯的数据集
  const menusArr = menus.map(function (item) {
    return item.get({ plain: true })
  })
  // 将数据集转换为树状结构
  return tools.getTreeData(menusArr, null, 'menu_id')
}

// 删除菜单、子菜单及其角色权限表中含有此id权限的记录
MenusModel.deleteMenu = async function (menu_id) {
  const t = await sequelize.transaction()
  try {
    let delete_ids = []
    // 找到菜单表中所有为此menu_id和父id为此menu_id的记录
    const menus = await MenusModel.findAll({
      where: { [Op.or]: [{ menu_id: menu_id }, { parent_id: menu_id }] }
    })
    // 只保留菜单id
    delete_ids = menus.map((item) => {
      return item.menu_id
    })
    // 删除权限表中对应记录
    await MenusModel.destroy({
      where: { menu_id: delete_ids }
    })
    // 删除角色权限表对应记录
    await RolesMenusModel.destroy({
      where: { menu_id: delete_ids }
    })

    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}
// 导出菜单模型
module.exports = MenusModel
