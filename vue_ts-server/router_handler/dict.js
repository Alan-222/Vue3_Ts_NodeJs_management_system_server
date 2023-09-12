const DictModel = require('../model/dict')
const DictItemModel = require('../model/dict-items.js')
// 导入需要的验证规则对象
const {
  get_dict_list_schema,
  add_dict_schema,
  edit_dict_schema,
  delete_dict_schema,
  get_dict_schema,
  get_dict_by_code_schema
} = require('../schema/dict')
// 导入op模块
const { Op } = require('sequelize')
// 获取字典列表接口
exports.getList = (req, res, next) => {
  const { value, error } = get_dict_list_schema.validate(req.query)
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
  let dict_name = value.dict_name
  let status = value.status
  if (dict_name) {
    where.dict_name = { [Op.like]: `%${dict_name}%` }
  }
  if (status) {
    where.status = { [Op.eq]: status }
  }
  DictModel.findAndCountAll({
    offset: offset,
    limit: limit,
    distinct: true,
    include: [{ model: DictItemModel }],
    where: where,
    order: [
      ['create_time', 'desc'],
      [DictItemModel, 'sort_order']
    ]
  }).then(function (dicts) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: dicts
    })
  })
}

// 添加字典接口
exports.addDict = (req, res, next) => {
  const { value, error } = add_dict_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  value.create_by = req.user.username
  DictModel.create(value).then(function (dict) {
    if (!dict) {
      return res.send({
        code: 1,
        message: '创建失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '创建成功',
      data: dict
    })
  })
}
// 编辑字典接口
exports.editDict = (req, res, next) => {
  const { value, error } = edit_dict_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  value.update_time = new Date()
  DictModel.update(value, {
    where: req.query
  }).then(function (dict) {
    if (!dict) {
      return res.send({
        code: 1,
        message: '修改失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '修改成功',
      data: dict
    })
  })
}
// 删除字典接口
exports.deleteDict = (req, res, next) => {
  const { value, error } = delete_dict_schema.validate(req.body)
  if (error) {
    return next(error)
  }
  const dict_ids = value.id
  DictModel.delDict(dict_ids || []).then(function (dict) {
    if (dict !== true) {
      return res.send({
        code: 1,
        message: '删除失败',
        data: null
      })
    }
    return res.send({
      code: 0,
      message: '删除成功',
      data: dict
    })
  })
}
// 获取单字典接口
exports.getOneDict = (req, res, next) => {
  const { value, error } = get_dict_schema.validate(req.query)
  if (error) {
    return next(error)
  }
  DictModel.findOne({
    where: value
  }).then(function (dict) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: dict
    })
  })
}
// 根据名称获取字典信息
exports.getDictByName = (req, res, next) => {
  const { value, error } = get_dict_by_code_schema.validate(req.query)
  if (error) {
    return next(error)
  }
  DictModel.findOne({
    where: value,
    include: [{ model: DictItemModel }],
    order: [[DictItemModel, 'sort_order']]
  }).then(function (dict) {
    return res.send({
      code: 0,
      message: '获取成功',
      data: dict.dict_items
    })
  })
}
