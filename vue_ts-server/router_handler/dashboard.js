const MenusModel = require('../model/menus')
const RolesModel = require('../model/roles')
const UsersModel = require('../model/users')

// 获取各实体数量
exports.getCount = async (req, res, next) => {
  const userCount = await UsersModel.count()
  const roleCount = await RolesModel.count()
  const menuCount = await MenusModel.count({where:{type:'M'}})
  const btnCount = await MenusModel.count({where:{type:'B'}})
  return res.send({
    code: 0,
    message: '获取成功',
    data: [
      { entity:'用户数',key:'user',value:userCount},
      { entity:'角色数',key:'role',value:roleCount},
      { entity:'菜单数',key:'menu',value:menuCount},
      { entity:'按钮数',key:'button',value:btnCount},
    ]
  })
}

// 获取模块菜单数量
exports.getModuleMenuCount=function (req,res,next) {
  MenusModel.getListTree(req.query).then(function (menuTree) {
    if(!menuTree || !menuTree.length)
      return res.send({
        code: 1,
        message: '获取失败',
        data: null
      })
      const countArr=menuTree.map(item=>({
        type:item.title,
        value:item.children?item.children.length:0
      }))
      return res.send({
        code: 0,
        message: '获取成功',
        data: countArr
      })
  })
}