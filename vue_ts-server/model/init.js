const Sequelize = require('sequelize');
// 建立连接
const sequelize = new Sequelize(
  // 以下内容根据自身修改
  'vue_ts-database', // 数据库名
  'root', // 连接用户名
  '123456', // 密码
  {
    dialect: 'mysql', // 数据库类型
    host: '127.0.0.1', // ip
    port: 3306, // 端口
    define: {
      timestamps: false // 不自动创建时间
    },
    timezone: '+08:00' // 东八时区
  }
);

module.exports = sequelize;
