## 数据库

### 导入数据库文件

新建数据库并导入 sql 目录下的 **database.sql**

### 修改数据库信息

根据自身修改 model 目录下的 init.js

```js
const sequelize = new Sequelize(
  // 以下内容根据自身修改
  'react_antd_admin', // 数据库名
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
)
```

## 项目安装

```
npm install
```

### 启动项目

```
npm run start
```
