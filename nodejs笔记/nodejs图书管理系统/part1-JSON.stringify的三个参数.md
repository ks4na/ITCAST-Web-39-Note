# nodejs图书管理系统 - 笔记

- [JSON.stringify输出带有缩进的字符串](#jsonstringify输出带有缩进的字符串)
- [补充： 第二个参数的用法](#补充-第二个参数的用法)

## JSON.stringify输出带有缩进的字符串
JSON.stringify()接收3个参数，第三个参数指定结果字符串中的缩进字符数。
```js
JSON.stringify(value[, replacer [, space]])
```
> 使用场景： 将json字符串格式化的形式输出到 `.json` 文件中。

例如：

```js
let obj = [
  {name: 'yuusha', age: 25},
  {name: 'ks4na', age: 24}
]

let str = JSON.stringify(obj, null, 4)
console.log(str)
/*
[
    {
        "name": "yuusha",
        "age": 25
    },
    {
        "name": "ks4na",
        "age": 24
    }
]
*/
```
## 补充： 第二个参数的用法

第二个参数为过滤函数，或者一个数组，数组序列化时每个属性都会经过该函数的转换和处理。

- 过滤函数：(key, val) => { return val }
  ```js
  let obj = [
    {name: 'yuusha', age: 25},
    {name: 'ks4na', age: 24}
  ]

  let str = JSON.stringify(obj, filterFn, 4)
  console.log(str)

  function filterFn(key, val){
    console.log(`key: ${key}, val: ${val}`)
    return val  // 必须返回val
  }
  ```
- 数组：仅转换该数组中具有键值的成员，成员的转换顺序与键在数组中的顺序一样。
  ```js
  let obj = [
    {name: 'yuusha', age: 25, gender: 'male'},
    {name: 'ks4na', age: 24, gender: 'male'}
  ]

  let filterArr = ['gender', 'name']

  let str = JSON.stringify(obj, filterArr, 4)
  console.log(str)
  /*
  [
    {
        "gender": "male",
        "name": "yuusha"
    },
    {
        "gender": "male",
        "name": "ks4na"
    }
  ]
  */
  ```
