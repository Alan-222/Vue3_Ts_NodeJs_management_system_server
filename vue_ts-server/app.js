// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
// 导入验证规则中间件
const joi = require('joi')

const bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
// 开启静态资源的访问
app.use('/public/avatar', express.static('./public/avatar'))
// 导入配置文件
const config = require('./config/index')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({
    path: ['/user/login', '/user/checkCode', '/user/refreshToken', '/user/addUser']
  })
)
// 导入并注册仪表盘模块
const dashboardRouter = require('./router/dashboard')
app.use('/dashboard', dashboardRouter)
// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/user', userRouter)
// 导入并注册用户角色模块
const roleRouter = require('./router/role')
app.use('/user/role', roleRouter)
// 导入并注册用户菜单模块
const menuRouter = require('./router/menu')
app.use('/user/menu', menuRouter)
// 导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/user/myInfo', userinfoRouter)
// 导入字典路由模块
const dictRouter = require('./router/dict')
app.use('/dict', dictRouter)
// 导入字典项路由模块
const dictItemRouter = require('./router/dict-items')
app.use('/dict/item', dictItemRouter)
// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.send({ code: 1, message: err.message })
  // token解析失败
  if (err.name === 'UnauthorizedError') return res.send({ code: 401, message: '身份认证失败' })
  // 未知错误
  return res.send({ code: 500, message: err.message })
})
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(9999, function () {
  console.log('api server running at http://127.0.0.1:9999')
})
