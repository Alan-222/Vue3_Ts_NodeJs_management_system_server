const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('./init');

// 定义表的模型
const DictItemModel = sequelize.define('dict_items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dict_id: {
    type: Sequelize.INTEGER
  },
  item_text: {
    type: Sequelize.STRING(255)
  },
  item_value: {
    type: Sequelize.STRING(255)
  },
  description: {
    type: Sequelize.STRING(255)
  },
  sort_order: {
    type: Sequelize.INTEGER,
    defaultValue: 0
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

module.exports = DictItemModel;
