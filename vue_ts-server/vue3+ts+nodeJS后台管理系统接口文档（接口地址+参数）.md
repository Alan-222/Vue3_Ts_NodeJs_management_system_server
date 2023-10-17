#### vue3+ts+nodeJS 后台管理系统接口文档（接口地址+参数）

##### 后端服务地址

http://127.0.0.1:9999

##### 公共模块

1. 每个接口 header 需要的参数值（公共、登录模块不需要）

   | 参数名 | 类型   | 是否必选 | 备注     |
   | ------ | ------ | -------- | -------- |
   | token  | String | 是       | 接口密钥 |

2. 刷新 token
   **接口地址**：http://127.0.0.1:9999/user/refreshToken
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名       | 类型   | 是否必选 | 备注           |
   | ------------ | ------ | -------- | -------------- |
   | refreshToken | String | 是       | 刷新token |

##### 登录模块

1. 获取验证码

   **接口地址**：http://127.0.0.1:9999/user/checkCode
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名 | 类型   | 是否必选 | 备注           |
   | ------ | ------ | -------- | -------------- |
   | uuid   | number | 是       | 图形验证码键值 |

2. 登录
   **接口地址**：http://127.0.0.1:9999/user/login
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名    | 类型   | 是否必选 | 备注           |
   | --------- | ------ | -------- | -------------- |
   | username  | String | 是       | 用户名         |
   | password  | String | 是       | 密码           |
   | checkCode | String | 是       | 图形验证码     |
   | uuid      | number | 是       | 图形验证码键值 |

##### 用户模块

1. 获取用户列表

   **接口地址**：http://127.0.0.1:9999/user/list
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名      | 类型   | 是否必选 | 备注     |
   | ----------- | ------ | -------- | -------- |
   | pageSize    | number | 是       | 每页数量 |
   | currentPage | number | 是       | 页码     |
   | username    | String | 否       | 用户名   |
   | status      | Char   | 否       | 状态     |

2. 添加用户

   **接口地址**：http://127.0.0.1:9999/user/addUser
   **接口连接方式**：POST

   **接口所需参数**：

   | 参数名   | 类型   | 是否必选 | 备注         |
   | -------- | ------ | -------- | ------------ |
   | username | String | 是       | 用户名       |
   | password | String | 是       | 密码         |
   | role_ids | Array  | 是       | 角色 id 数组 |
   | nickname | String | 否       | 昵称         |
   | email    | String | 否       | 邮箱         |
   | status   | Char   | 否       | 状态         |

3. 修改用户

   **接口地址**：http://127.0.0.1:9999/user/editUser/:user_id
   **接口连接方式**：POST

   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | user_id | number | 是       | 用户 id |

   **接口所需参数**：

   | 参数名   | 类型   | 是否必选 | 备注         |
   | -------- | ------ | -------- | ------------ |
   | username | String | 是       | 用户名       |
   | role_ids | Array  | 是       | 角色 id 数组 |
   | nickname | String | 否       | 昵称         |
   | email    | String | 否       | 邮箱         |
   | status   | Char   | 否       | 状态         |

4. 删除用户

   **接口地址**：http://127.0.0.1:9999/user/delUser
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名  | 类型          | 是否必选 | 备注    |
   | ------- | ------------- | -------- | ------- |
   | user_id | number、Array | 是       | 用户 id |

5. 根据 id 获取用户信息

   **接口地址**：http://127.0.0.1:9999/user/queryUserInfo/:user_id
   **接口连接方式**：GET
   **接口所需参数（Params 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | user_id | number | 是       | 用户 id |

6. 重置密码

   **接口地址**：http://127.0.0.1:9999/user/editPwd
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名       | 类型   | 是否必选 | 备注     |
   | ------------ | ------ | -------- | -------- |
   | user_id      | number | 是       | 用户 id  |
   | old_password | string | 是       | 旧密码   |
   | password     | string | 是       | 新密码   |
   | repassword   | string | 是       | 确认密码 |

##### 角色模块

1. 获取角色列表

   **接口地址**：http://127.0.0.1:9999/user/role/listRole
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名      | 类型   | 是否必选 | 备注     |
   | ----------- | ------ | -------- | -------- |
   | pageSize    | number | 是       | 每页数量 |
   | currentPage | number | 是       | 页码     |
   | role_name   | String | 否       | 角色名   |

2. 添加角色

   **接口地址**：http://127.0.0.1:9999/user/role/addRole
   **接口连接方式**：POST

   **接口所需参数**：

   | 参数名    | 类型   | 是否必选 | 备注   |
   | --------- | ------ | -------- | ------ |
   | role_name | String | 是       | 角色名 |
   | remark    | String | 否       | 描述   |
   | status    | Char   | 否       | 状态   |

3. 修改角色

   **接口地址**：http://127.0.0.1:9999/user/role/editRole
   **接口连接方式**：POST
   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | role_id | number | 是       | 角色 id |

   **接口所需参数**：

   | 参数名    | 类型   | 是否必选 | 备注   |
   | --------- | ------ | -------- | ------ |
   | role_name | String | 是       | 角色名 |
   | remark    | String | 否       | 描述   |
   | status    | Char   | 否       | 状态   |

4. 根据 id 获取角色信息

   **接口地址**：http://127.0.0.1:9999/user/getRole
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | role_id | number | 是       | 角色 id |

5. 删除角色

   **接口地址**：http://127.0.0.1:9999/user/delRole
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名   | 类型  | 是否必选 | 备注    |
   | -------- | ----- | -------- | ------- |
   | role_ids | Array | 是       | 角色 id |

6. 获取所有角色

   **接口地址**：http://127.0.0.1:9999/user/allRole
   **接口连接方式**：GET

7. 获取角色权限

   **接口地址**：http://127.0.0.1:9999/user/role/roleResource
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | role_id | number | 是       | 角色 id |

8. 更新角色权限

   **接口地址**：http://127.0.0.1:9999/user/role/updateRoleResource
   **接口连接方式**：POST
   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | role_id | number | 是       | 角色 id |

   **接口所需参数**：

   | 参数名   | 类型  | 是否必选 | 备注         |
   | -------- | ----- | -------- | ------------ |
   | menu_ids | Array | 是       | 菜单 id 数组 |

##### 菜单模块

1. 获取菜单列表

   **接口地址**：http://127.0.0.1:9999/user/menu/listMenu
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名 | 类型   | 是否必选 | 备注     |
   | ------ | ------ | -------- | -------- |
   | title  | String | 否       | 菜单标题 |

2. 添加菜单

   **接口地址**：http://127.0.0.1:9999/user/menu/addMenu
   **接口连接方式**：POST

   **接口所需参数**：

   | 参数名     | 类型   | 是否必选       | 备注         |
   | ---------- | ------ | -------------- | ------------ |
   | parent_id  | number | 是             | 权限父 id    |
   | title      | String | 是             | 权限标题     |
   | sort       | number | 是             | 权限排序     |
   | type       | String | 是             | 权限类别     |
   | name       | String | 是             | 路由名       |
   | component  | String | 否（菜单必选） | 路由文件地址 |
   | path       | String | 否（菜单必选） | 路由地址     |
   | redirect   | String | 否             | 重定向地址   |
   | permission | String | 否（按钮必选） | 权限标识     |
   | hidden     | String | 否             | 菜单是否隐藏 |
   | icon       | String | 否             | 菜单图标     |

3. 修改菜单

   **接口地址**：http://127.0.0.1:9999/user/menu/editMenu
   **接口连接方式**：POST

   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | menu_id | number | 是       | 菜单 id |

   **接口所需参数**：

   | 参数名     | 类型   | 是否必选       | 备注         |
   | ---------- | ------ | -------------- | ------------ |
   | parent_id  | number | 是             | 权限父 id    |
   | title      | String | 是             | 权限标题     |
   | sort       | number | 是             | 权限排序     |
   | type       | String | 是             | 权限类别     |
   | name       | String | 是             | 路由名       |
   | component  | String | 否（菜单必选） | 路由文件地址 |
   | path       | String | 否（菜单必选） | 路由地址     |
   | redirect   | String | 否             | 重定向地址   |
   | permission | String | 否（按钮必选） | 权限标识     |
   | hidden     | String | 否             | 菜单是否隐藏 |
   | icon       | String | 否             | 菜单图标     |

4. 根据 id 获取菜单

   **接口地址**：http://127.0.0.1:9999/user/menu/getMenu
   **接口连接方式**：GET
   **接口所需参数（Query 参数）**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | menu_id | number | 是       | 菜单 id |

5. 删除菜单

   **接口地址**：http://127.0.0.1:9999/user/menu/delMenu
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名  | 类型   | 是否必选 | 备注    |
   | ------- | ------ | -------- | ------- |
   | menu_id | number | 是       | 菜单 id |

6. 获取菜单项

   **接口地址**：http://127.0.0.1:9999/user/menu/listMenuOptions
   **接口连接方式**：GET

##### 用户信息模块（已登录用户）

1. 获取用户信息

   **接口地址**：http://127.0.0.1:9999/user/myInfo/userinfo
   **接口连接方式**：GET

2. 更新用户信息

   **接口地址**：http://127.0.0.1:9999/user/myInfo/updateUserinfo
   **接口连接方式**：POST

   **接口所需参数**：

   | 参数名   | 类型   | 是否必选 | 备注   |
   | -------- | ------ | -------- | ------ |
   | username | String | 否       | 用户名 |
   | nickname | String | 否       | 昵称   |
   | email    | String | 否       | 邮箱   |

3. 更新用户密码

   **接口地址**：http://127.0.0.1:9999/user/myInfo/updatePwd
   **接口连接方式**：POST
   **接口所需参数**：

   | 参数名       | 类型   | 是否必选 | 备注     |
   | ------------ | ------ | -------- | -------- |
   | old_password | string | 是       | 旧密码   |
   | password     | string | 是       | 新密码   |
   | repassword   | string | 是       | 确认密码 |

4. 更新用户头像
   **接口地址**：http://127.0.0.1:9999/user/myInfo/updateAvatar
   **接口连接方式**：POST

   **接口请求方式**：form-data

   **接口所需参数**：

   | 参数名 | 类型   | 是否必选 | 备注     |
   | ------ | ------ | -------- | -------- |
   | file   | object | 是       | 头像文件 |
