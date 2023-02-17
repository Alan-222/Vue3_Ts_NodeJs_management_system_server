const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('./init');
const DictItemModel = require('./dict-items');
// 定义表的模型
const DictModel = sequelize.define('dict', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dict_name: {
    type: Sequelize.STRING(255)
  },
  dict_code: {
    type: Sequelize.STRING(255)
  },
  description: {
    type: Sequelize.STRING(255)
  },
  status: {
    type: Sequelize.CHAR,
    defaultValue: '1'
  },
  create_by: {
    type: Sequelize.STRING(32)
  },
  update_time: {
    type: Sequelize.DATE,
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

// 删除字典关联字典项都删除
DictModel.delDict = async function (dict_ids) {
  const t = await sequelize.transaction();
  try {
    // 先删除字典表中字典id数组的角色
    await DictModel.destroy({
      where: { id: dict_ids }
    });
    // 再删除字典项表中的字典项
    await DictItemModel.destroy({
      where: { dict_id: dict_ids }
    });
    t.commit();
    return true;
  } catch (e) {
    t.rollback();
    return false;
  }
};

// 建立关联
DictModel.hasMany(DictItemModel, {
  foreignKey: 'dict_id'
});
DictItemModel.belongsTo(DictModel, {
  foreignKey: 'dict_id'
});
module.exports = DictModel;
