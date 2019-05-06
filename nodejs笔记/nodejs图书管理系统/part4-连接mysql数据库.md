# nodejs连接mysql数据库

- [安装mysql模块](#安装mysql模块)
- [连接池方式连接](#连接池方式连接)

## 安装mysql模块
```sh
yarn add mysqljs/mysql
```
## 连接池方式连接
```js
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10, 
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'express_lib_mnr'
})

module.exports = pool

// 查询示例：查询id为1的书籍信息
const sql = 'SELECT `id`, `name`, `author`, `description` FROM `t_book` WHERE `id` = ? AND `is_del` = 0'
const params = [1]
pool.query(sql, params, (err, results) => {
  if(err) throw err
  console.log(results)
})
```