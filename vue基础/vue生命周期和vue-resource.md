# vue生命周期和vue-resource

- [vue生命周期](#vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
- [vue-resource](#vue-resource)
  - [全局配置ajax请求的接口的根路径](#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AEajax%E8%AF%B7%E6%B1%82%E7%9A%84%E6%8E%A5%E5%8F%A3%E7%9A%84%E6%A0%B9%E8%B7%AF%E5%BE%84)

## vue生命周期
- beforeCreate：  此阶段只创建了一个默认的Vue对象，包含默认的生命周期函数和默认的事件，data，methods等尚未初始化  
- created：       此阶段data，methods可用  
- beforeMount：   模板已经在内存中编译好了，但是尚未挂在到页面中
- mounted：       内存中编译好的模板已经挂载到页面中了，此时Vue实例已经脱离创建阶段，进入运行阶段
- beforeUpdate：  data数据改变，但是页面数据尚未更新
- updated：       页面更新之后
- beforeDestroy： 组件销毁前，data， methods等都还可用
- destroyed：     组件已完全销毁，此时data， methods等已不可用

![Vue lifecycle](./media/lifecycle.png)

## vue-resource
vue自带的ajax请求工具，具体使用类似 `axios`， 详见文档。
> `vue-resource` 依赖于  `vue` ，所以引入 `vue-resource.js` 之前需要先引入 `vue.js` 。

写法：  
```js
// ...
handleFetch(){
  this.$http.get(url).then(res => {
    console.log(res)
  }).catch(err => {
    throw err
  })
}
// ...
```

> 注意： post请求，一般情况是`x-www-form-urlencoded`格式的，需要加上`emulateJSON`配置项  
> ```js
> handlePost(){
>  this.$http.post(url, data, {emulateJSON: true}).then(successCallback, errorCallback)
> }
> ```
> 全局配置post请求以`x-www-form-urlencoded`形式发送：  
> ```js
> Vue.http.options.emulateJSON = true
> ```

### 全局配置ajax请求的接口的根路径
```js
Vue.http.options.root = '/root'
Vue.http.headers.common['Authorization'] = 'xxxxxxx'
```
> 注意： 设置了根路径之后， 请求路径最前面不需要加 `/`， 而是直接写， 如： `this.$http.get('api/list')` 。
