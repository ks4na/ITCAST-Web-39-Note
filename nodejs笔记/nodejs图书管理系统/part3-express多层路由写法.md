# Express 定义多层路由

要实现的效果：

```sh
# 能够访问多层路由，同时不能影响每一层的其它路由处理
/api/tests/:id/questions/:qid/comments/:cid
```

写法示例：

```js
const expess = require('express')

// 这里定义三个层级 test > question > comment
const testRouter = express.Router()
const questionRouter = express.Router()
const commentRouter = express.Router()


// router将符合 /api/tests 的路由交给 testRouter 处理
router.use('/api/tests', testRouter)


// 第一层级 testRouter
// 在最前面声明下一层级的路由中间件，先进行下一层级的匹配
testRouter.use('/:id/questions', questionRouter)

// 然后是本层级的匹配： GET/POST/PUT/DELETE
testRouter.get('/', (req, res) => {
  res.send('GET /api/tests')
})
testRouter.get('/:id' ,(req, res) => {
  res.send('GET /api/tests/:id')
})


// 第二层级 questionRouter
// 在最前面声明下一层级的路由中间件，先进行下一层级的匹配
questionRouter.use('/:qid/comments', commentRouter)

// 然后是本层级的匹配： GET/POST/PUT/DELETE
questionRouter.get('/', (req, res) => {
  res.send('GET /api/tests/:id/questions')
})

questionRouter.get('/:qid', (req, res) => {
  res.send('GET /api/tests/:id/questions/:qid')
})


// 第三层级 commentRouter
commentRouter.get('/', (req, res) => {
  res.send('GET /api/tests/:id/questions/:qid/comments')
})
commentRouter.get('/:cid', (req, res) => {
  res.send('GET /api/tests/:id/questions/:qid/comments/:cid')
})
commentRouter.put('/:cid', (req, res) => {
  res.send('PUT /api/tests/:id/questions/:qid/comments/:cid')
})
```

> 总结：
>
> 先将下一层级的匹配写在最前面，让其先进行匹配，注意使用 `router.use()` 交给下一层级的 `router` 。

