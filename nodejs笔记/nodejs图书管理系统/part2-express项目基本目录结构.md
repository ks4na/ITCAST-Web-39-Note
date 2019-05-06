# express项目基本目录结构

- [操作步骤](#操作步骤)
  - [初始化项目目录](#初始化项目目录)
  - [安装依赖](#安装依赖)
  - [index.js](#indexjs)
  - [router.js](#routerjs)
  - [bookRouter.js](#bookrouterjs)
  - [loginController.js](#logincontrollerjs)
  - [bookController.js](#bookcontrollerjs)

## 操作步骤
### 初始化项目目录
```sh
yarn init
```
目录结构如下：
```sh
.
|-- index.js
|-- public
|   |-- css
|   |-- fonts
|   |-- images
|   `-- js
|-- routers
|   |-- router.js
|   `-- bookRouter.js
|-- controllers
|   |-- bookController.js
|   `-- loginController.js
|-- views
|   `-- index.art
|-- node_modules
|-- package.json
`-- yarn.lock
```
简单说明:
- index.js: 入口文件
- public：静态文件目录，存放css、js、images、fonts等直接可访问的静态文件
- routers：存放路由处理中间件
  - router.js： 总路由处理中间件
  - xxxRouter.js： 子路由处理中间件
- controllers：存放各个路由对应的处理文件
- views：存放模板文件

### 安装依赖
```sh
# 安装express、可选安装art-template、express-art-tempalte模版引擎
yarn add express art-template express-art-template
```
package.json文件参考：
```json
{
  "name": "express-backend-structure",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "license": "MIT",
  "dependencies": {
    "art-template": "^4.13.2",
    "express": "^4.16.4",
    "express-art-template": "^1.0.1"
  }
}
```

### index.js
```js
const express = require('express')
const router = require('./routers/router.js')

const app = express()


// 静态资源托管中间件 [注意加不加虚拟目录的访问路径]
app.use(express.static('public'))
// POST请求体处理中间件
app.use(express.urlencoded({extended: false}))
// 配置art-template模板引擎 [可选]
app.engine('art', require('express-art-template'))
app.set('views', './views')  // 指定模板文件的目录
app.set('view engine', 'art')  // 注册模板引擎


// 将所有请求交给路由中间件router处理
app.use(router)


// 监听端口
const server = app.listen(3000, 'localhost', () => {
  const {address, port} = server.address()
  console.log(`server is running on port http://${address}:${port}`)
})
```

### router.js
```js
const express = require('express')
const router = express.Router()
// 引入loginController
const loginController = require('../controllers/loginController.js')
// 请求路径过多的话，再细分为各个子模块router，在各个子模块router中引入相应的controller
const bookRouter = require('./bookRouter.js')


// GET /
router.get('/', loginController.toIndex)

// GET /index
router.get('/index', loginController.toIndex)

// 将所有/books请求交给bookRouter路由中间件处理
// 设置多级路由**必须使用use()**而不是all()
router.use('/books', bookRouter)


// 不要忘记将router暴露给外部
module.exports = router
```

### bookRouter.js
```js
const express = require('express')
const router = express.Router()
// 引入bookController.js来处理请求
const bookController = require('../controllers/bookController.js')


// GET /books
router.get('/', bookController.getBookList)

// GET /books/:id
router.get('/:id', bookController.queryBook)

// POST /books
router.post('/', bookController.addBook)

// PUT /books/:id
router.put('/:id', bookController.updateBook)

// PUT /books/:id/disable
router.put('/:id/disable', bookController.disableBook)

// DELETE /books/:id
router.delete('/:id', bookController.removeBook)


module.exports = router
```

### loginController.js
```js
module.exports = {
  toIndex: (req, res) => {
    // 调用模版引擎渲染index页面并返回
    res.render('index')
  }
}
```

### bookController.js
```js
module.exports = {
  // 获取图书列表
  getBookList: (req, res) => {
    res.send('getBookList')
  },
  // 查询图书
  queryBook: (req, res) => {
    res.send(`queryBook ${req.params.id}`)
  },
  // 新增图书
  addBook: (req, res) => {
    let response = {'desc': 'addBook'}
    response = {...response, ...req.body}
    res.json(response)
  },
  // 更新图书
  updateBook: (req, res) => {
    let response = {'desc': `updateBook ${req.params.id}`}
    response = {...response, ...req.body}
    res.json(response)
  },
  // 删除图书
  removeBook: (req, res) => {
    res.send(`removeBook ${req.params.id}`)
  },
  // 禁用图书
  disableBook: (req, res) => {
    res.send(`disable book ${req.params.id}`)
  },
}
```