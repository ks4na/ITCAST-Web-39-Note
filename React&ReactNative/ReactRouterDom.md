# react-router-dom

`react-router` 有  `react-router-dom` 和 `react-router-native` 两个版本，开发WEB应用使用的是 `react-router-dom` 。  

- [使用react-router-dom](#使用react-router-dom)
  - [1.安装](#1安装)
  - [2.配置路由信息](#2配置路由信息)
  - [3.其它](#3其它)
    - [3.1精确匹配路由地址](#31精确匹配路由地址)
    - [3.2获取路由参数和查询参数](#32获取路由参数和查询参数)
    - [3.3独立路由组件Switch和重定向组件Redirect](#33独立路由组件Switch和重定向组件Redirect)
    - [3.4嵌套布局的推荐写法](#34嵌套布局的推荐写法)

## 使用react-router-dom

> react-router-dom 版本为 `4` 。  

### 1.安装
```sh
yarn add react-router-dom
```  
### 2.配置路由信息  
使用 `<HashRouter>` / `<BrowserRouter>` 将App根组件包裹起来，网站就启用了路由。  

> `<HashRouter>` 是老版本浏览器提供的hash模式，而 `<BrowserRouter>` 是使用H5提供的history模式，这种模式对用户、SEO更友好，但是部署时需要后端支持（开发时可以[配置devServer.historyApiFallback选项](https://webpack.docschina.org/configuration/dev-server/#devserver-historyapifallback)）,部署上线时如果不需要考虑旧版本浏览器，推荐使用 `<BrowserRouter>`；  
> 一个网站中只需要使用一次 `<HashRouter>`  / `<BrowserRouter>` ；   
> `<HashRouter>` / `<BrowserRouter>` 中只能有一个根元素。  

```jsx
// App.jsx

import React, { Component } from 'react'
import {HashRouter, Link, Route} from 'react-router-dom'

// 引入Home，Movie，About组件
import Home from './Home.jsx'
import Movie from './Movie.jsx'
import About from './About.jsx'

export default class App extends Component {

  render (){
    return (
      <HashRouter>
        <div>
          <h1>App.jsx</h1>
          <Link to="/home">首页</Link>
          <Link to="/movie">电影</Link>
          <Link to="/about">关于</Link>

          <Route path="/home" component={Home}></Route>
          <Route path="/movie" component={Movie}></Route>
          <Route path="/about" component={About}></Route>
        </div>
      </HashRouter>
    )
  }
}
```  
### 3.其它  
#### 3.1精确匹配路由地址
v4版本的路由默认是包含式路由：如 `path="/user"` 的路由会匹配 `path="/"` 的路由，在页面中两个组件都会被渲染：

```jsx
<HashRouter>
  <div>
     <Link to="/">首页</Link>
     <Link to="/movie">电影</Link>
     
     <Route path="/" component={Index}></Route>
     <Route path="/movie" component={Moive}></Route>
  </div>
</HashRouter>
```   

上面这个例子中，点击 `电影`，则 `Index` 和 `Movie` 两个组件都会展示，  
如果想要精确匹配，需要添加上 `exact` 属性：  

```jsx
<HashRouter>
  <div>
     <Link to="/">首页</Link>
     <Link to="/movie">电影</Link>
     
     <Route exact path="/" component={Index}></Route>
     <Route path="/movie" component={Moive}></Route>
  </div>
</HashRouter>
```  

#### 3.2获取路由参数和查询参数
- 路由参数：使用 `this.props.match.params.参数名` 获取；
- 查询参数：v4版本不再提供 `this.props.location.query`，需要手动从 `this.props.location.search` 中获取(可以安装 `query-string` 来解析)。
  ```jsx
  import queryString from 'query-string'

  class Test extends Component{

    render (){
      console.log(queryString.parse(this.props.location.search))  // 注意必须从 this.props.location.search 而不是 location.search, 因为hashRouter 下 location.search 获取不到查询参数

      return null
    }
  }
  ```

#### 3.3独立路由组件Switch和重定向组件Redirect
如果想要只匹配一个路由，除了使用 `exact` 属性之外，还可以使用 `<Switch>` 组件。  
`<Switch>` 组件**只会渲染第一个匹配的组件**。（仍然可能需要添加 `exact` 属性，当然也可以通过调整 `<Route>` 顺序而省略 `exact` 属性）  

```jsx
import { Switch, Route, Redirect } from 'react-router-dom'

<Switch>
  <Route exact path="/" component={Index}/>
  <Route exact path="/movie" component={Movie}/>
  <Route path="/movie/add" component={MovieAddPage}/>
  <Redirect to="/" />
</Switch>
```

`<Redirect>` 组件用于重定向，上面的例子中用在 `<Switch>` 中时，当上面所有 `<Route>` 都不匹配时重定向到 `/` 。


#### 3.4嵌套布局的推荐写法
嵌套布局很常见，例如用户列表页面（UserList组件，对应路由`/users`），单个用户详情页面（UserDetail组件，对应路由`/users/:id`），用户信息编辑页面（UserInfoEdit组件，对应路由 `/users/:id/edit`）和 新增用户页面（UserAdd组件，对应路由 `/users/add`）。  

最容易想到的方案是： 

```jsx
<Switch>
  <Route exact path="/" component={Index}/>
  <Route exact path="/users" component={UserList}/>
  <Route path="/users/add" component={UserAdd}/>
  <Route path="/users/:id/edit" component={UserInfoEdit}/>
  <Route path="/users/:id" component={UserDetail}/>
  <Redirect to="/"/>
</Switch>
```  

但是如果这几个用户模块的组件都包含一个 `<UserNav />` 组件，如果这样写，将需要在每个模块都包含一个 `<UserNav />` 组件，造成代码冗余。  

推荐的写法是，将用户模块的组件包裹到 `UserLayout` 组件中，在 `UserLayout` 组件中再根据路由进行划分：  

```jsx
<Switch>
  <Route exact path="/" component={Index}/>
  <Route path="/users" component={UserLayout}/>
  <Redirect to="/"/>
</Switch>

function UserLayout(){
  return (
    <div className="user-layout">

      <aside>
        <UserNav />
      </aside>
      
      <div className="content">
        <Switch>
          <Route exact path="/users" component={UserList}/>
          <Route path="/users/add" component={UserAdd}/>
          <Route path="/users/:id/edit" component={UserInfoEdit}/>
          <Route path="/users/:id" component={UserDetail}/>
          <Redirect to="/users"/>
        </Switch>
      </div>
    </div>
  )
}
```  

注意：在 `UserLayout` 组件中子组件仍然需要明确父组件的路径（这里是 `/users`），为了避免硬编码，可以通过 `props.match.path` 来替换：  

```jsx
 <Switch>
  <Route exact path={`${props.match.path}`} component={UserList}/>
  <Route path={`${props.match.path}/add`} component={UserAdd}/>
  <Route path={`${props.match.path}/:id/edit`} component={UserInfoEdit}/>
  <Route path={`${props.match.path}/:id`} component={UserDetail}/>
  <Redirect to={`${props.match.path}`}/>
</Switch>
```  

还有一个属性为 `props.match.url` ,当有路由参数的时候，这个属性的值为实际的 `url`, 而此时 `props.match.path` 为 `<Route>` 中定义的path参数，  
所以两者的使用场景有很大区别：  
- `props.match.url` 适用于构造嵌套的 `<Link>`；
- `props.match.path` 适用于构造嵌套的 `<Route>` 。

