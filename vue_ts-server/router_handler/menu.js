const MenusModel = require('../model/menus')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
// 导入需要的验证规则对象
const { add_menu_schema, edit_menu_schema, delete_menu_schema, get_menu_schema } = require('../schema/menu')
// 将菜单格式化为{value,label}的形式
function filterRoutes(routes) {
  const res = []
  routes.forEach((item) => {
    // 目录、菜单是否存在孩子
    if (item.children) {
      // 检测菜单孩子是否存在按钮
      if (item.children.some((item) => item.type === 'B')) {
        const perms = []
        const children = []
        // 若是按钮的用perm数组存储、是菜单的用children存储
        item.children.forEach((_item) => {
          if (_item.type === 'B') {
            perms.push({
              value: _item.menu_id,
              label: _item.title,
              permission: _item.permission
            })
          } else {
            children.push(_item)
          }
        })
        const menuItem = {
          value: item.menu_id,
          label: item.title,
          children: children || undefined,
          perms: perms || undefined
        }
        // 继续递归判断菜单之下是否还有孩子
        if (menuItem.children && menuItem.children.length) {
          menuItem.children = filterRoutes(menuItem.children)
        }
        res.push(menuItem)
      } else {
        const menuItem = {
          value: item.menu_id,
          label: item.title,
          children: item.children || undefined
        }
        // 继续递归判断菜单之下是否还有孩子
        if (menuItem.children && menuItem.children.length) {
          menuItem.children = filterRoutes(menuItem.children)
        }
        res.push(menuItem)
      }
    } else {
      const menuItem = {
        value: item.menu_id,
        label: item.title
      }

      res.push(menuItem)
    }
  })
  return res
}
function filterAuthTree(tree) {
  return tree.map((item) => {
    return {
      key: item.menu_id,
      title: item.title,
      children: item.children && item.children.length ? filterAuthTree(item.children) : undefined
    }
  })
}
exports.getMenuList = (req, res) => {
  MenusModel.getListTree(req.query).then(function (menuTree) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: menuTree || []
    })
  })
}

exports.getMenuOptions = (req, res) => {
  MenusModel.getListTree(req.query).then(function (menuTree) {
    const filterTree = filterRoutes(menuTree)
    return res.send({
      code: 0,
      message: '获取成功',
      data: filterTree || []
    })
  })
}

exports.getAuthOptions = (req, res) => {
  MenusModel.getListTree(req.query).then(function (anthTree) {
    const filterTree = filterAuthTree(anthTree)
    return res.send({
      code: 0,
      message: '获取成功',
      data: filterTree || []
    })
  })
}

exports.addMenu = (req, res, next) => {
  // 校验入参
  const { value, error } = add_menu_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  // 创建数据库条目
  MenusModel.create(value).then(function (menu) {
    // 返回信息
    if (!menu) {
      return res.send({
        code: 1,
        message: '创建失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '创建成功',
      data: menu.menu_id
    })
  })
}

exports.editMenu = (req, res, next) => {
  const { value, error } = edit_menu_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  delete value.menu_id
  value.update_time = new Date()
  MenusModel.update(value, {
    where: {
      menu_id: req.query.menu_id || 0
    }
  }).then(function (menu) {
    if (!menu) {
      return res.send({
        code: 1,
        message: '修改失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '修改成功',
      data: menu
    })
  })
}

exports.deleteMenu = (req, res, next) => {
  const { value, error } = delete_menu_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  const { menu_id }=value
  const noDeleteMenuIds=[1,2,3,40,41,42,43,44,45,46,47,48,49,50,51]
  if (noDeleteMenuIds.includes(menu_id))
    return res.send({
      code: 1,
      message: '配置权限菜单不可删除',
      data: null
    })
  MenusModel.deleteMenu(value.menu_id).then(function (menu) {
    if (menu === true) {
      return res.send({
        code: 0,
        message: '删除成功',
        data: null
      })
    } else {
      return res.send({
        code: 1,
        message: '删除失败',
        data: null
      })
    }
  })
  // MenusModel.destroy({
  //   where: {
  //     [Op.or]: [{ menu_id: value.menu_id }, { parent_id: value.menu_id }]
  //   }
  // }).then(function (menu) {
  //   return res.send({
  //     code: 0,
  //     message: '删除成功',
  //     data: menu
  //   });
  // });
}

exports.getOneMenu = (req, res, next) => {
  const { value, error } = get_menu_schema.validate(req.query)
  if (error) {
    return next(error)
  }
  MenusModel.findOne({
    where: {
      menu_id: value.menu_id
    }
  }).then(function (menu) {
    if (!menu)
      return res.send({
        code: 1,
        message: '获取失败',
        data: null
      })
    return res.send({
      code: 0,
      message: '获取成功',
      data: menu
    })
  })
}
