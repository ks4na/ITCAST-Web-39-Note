# vue路由

- [前端路由和后端路由](#前端路由和后端路由)
- [vue-router基本使用](#vue-router基本使用)
- [路由跳转-router-link](#路由跳转-router-link)
  - [编程式路由跳转](#编程式路由跳转)
- [路由redirect属性](#路由redirect属性)
- [路由切换启用动画](#路由切换启用动画)
- [路由传参](#路由传参)
  - [query方式传参](#query方式传参)
  - [params方式传参](#params方式传参)
- [路由嵌套](#路由嵌套)
- [命名视图](#命名视图)

## 前端路由和后端路由
- 后端路由：每个URL对应服务器上的某个资源；
- 前端路由：单页面应用程序通过URL地址中的hash值来实现页面间的切换。

> hash的特点：http请求时不会包含hash相关的内容。

## vue-router基本使用
1. 首先引入 `vue-router` 包，该包依赖 `vue` ，在 `vue` 引入之后引入；
2. 创建VueRouter对象
   ```js
   // 创建loginComp和registerComp组件
   var loginComp = {
     template: '<div>登录组件</div>',
   }
   var registerComp = {
     template: '<div>注册组件</div>',
   }

   // 创建VueRouter对象，定义routes属性
   var router = new VueRouter({
     routes: [
       {path: '/login', component: loginComp },
       {path: '/register', component: registerComp },
     ],
   })
   ```
3. 将VueRouter对象的实例绑定到Vue实例上
   ```js
   var vm = new Vue({
     ...
     router: router,
   })
   ```
4. 在 `#app` 中声明 `router-view`
   ```html
   <div id="#app">
      <router-view></router-view>
   </div>
   ```
5. 打开页面，在URL的#后面输入`/login` 和 `/register` 测试。

## 路由跳转-router-link
定义跳转链接的方式可以使用a标签，但是不推荐，且每次需要加上#不方便，官方建议使用 `<router-link>` 组件：  
```html
<router-link to="/login"></router-link>
```
> `<router-link>` 默认渲染成 `a` 标签，可以通过 `tag` 属性指定成其它标签。  
使用 `<router-link>`的另一个好处是： `<router-link>` 组件会为当前选中的链接添加上 `router-link-exact-active`，`router-link-active` 类名，方便对选中的链接设置样式。

### 编程式路由跳转
```js
this.$router.push()
this.$router.replace()
this.$router.go()
```


## 路由redirect属性
路由的 redirect属性用于前端路由的重新跳转
```js
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
  ]
})
```

## 路由切换启用动画
路由切换时添加动画，只需要将 `<router-view>` 组件用 `<transition>` 组件包裹。
```html
<transition>
  <router-view></router-view>
</transition>
```

## 路由传参
### query方式传参
组件中通过 `$route.query` 获取参数

### params方式传参
组件中通过 `$route.params` 获取参数

## 路由嵌套
例如需求如下：  
访问 `/register` 跳转注册页面， 注册页面有两个链接 `/register/msg` 和 `/register/email` ，
分别加载 短信/邮箱注册组件，而原本的注册页面其它内容不变。  

此时需要使用 `children` 属性实现路由嵌套。

```js
var router = new VueRouter({
  routes: [
    { path: '/register',
      component: registerComp,
      children: [
        {
          // 匹配 /register/msg，
          // 如果成功则msgRegisterComp组件会渲染在registerComp组件的 <router-view> 中
          path: 'msg',
          component: msgRegisterComp,
        },
        {
          // 匹配 /register/email，
          // 如果成功则emailRegisterComp组件会渲染在registerComp组件的 <router-view> 中
          path: 'email',
          component: emailRegisterComp,
        }
      ]
    }
  ]
})
```

> 注意:  
> `children` 属性中的 `path` 属性如果加上 `/` 则会被视为根路径.

## 命名视图
`<router-view>` 组件的 `name` 属性可以用来决定需要渲染的组件, 当同一个路由想要同时渲染多个组件时可以考虑使用命名视图.

```js
var router = new VueRouter({
  routes: [
    {path: '/', components: {
      default: defaultComp,
      a: aComp,
      b: bComp,
    }}
  ]
})
```
```html
  ...
  <router-view></router-view>
  <router-view name="a"></router-view>
  <router-view name="b"></router-view>
  ...
```