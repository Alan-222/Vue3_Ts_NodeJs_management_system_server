/**
 * 获取树形结构数据
 * @param data 数据
 * @param level 父id层级
 * @param idField 字段名
 * @param pidField 上一级字段名
 * @returns {null|[]}
 */
const getTreeData = function (data, level = null, idField = 'menu_id', pidField = 'parent_id') {
  const _level = []
  // 第一次进来获取所有父id
  if (level === null) {
    data.forEach(function (item) {
      _level.push(item[pidField])
    })
    level = Math.min(..._level)
  }
  let prefixPath = ''
  const getTreeInnerData = (data, level, idField = 'menu_id', pidField = 'parent_id') => {
    const tree = []
    data.forEach(function (item) {
      if (item[pidField] === level) {
        tree.push(item)
      }
    })
    if (tree.length === 0) {
      return null
    }
    // 对于父id为0的进行循环，然后查出父节点为上面结果id的节点内容
    tree.forEach(function (item) {
      if (item.type !== 'B') {
        if (_level.includes(item[idField])) prefixPath += '/' + item.path
        const childData = getTreeInnerData(data, item[idField], idField, pidField)
        if (childData != null) {
          item['menuPath'] = prefixPath
          item['children'] = childData
          prefixPath = ''
        } else {
          item['menuPath'] = prefixPath + '/' + item.path
        }
      }
    })
    return tree
  }
  return getTreeInnerData(data, level, idField, pidField)
}
/**
 * 获取两个数组差集
 * @param arr1
 * @param arr2
 * @returns {*[]}
 */
const minustArr = function (arr1 = [], arr2 = []) {
  return arr1.filter(function (v) {
    return arr2.indexOf(v) === -1
  })
}

module.exports = {
  getTreeData,
  minustArr
}
