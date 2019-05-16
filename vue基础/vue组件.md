# vue组件

- [1.组件化和模块化的区别](#1组件化和模块化的区别)
- [2.定义全局组件的方式](#2定义全局组件的方式)
- [3.定义私有组件](#3定义私有组件)
- [4.组件中的data](#4组件中的data)
- [5.组件切换](#5组件切换)
  - [5.1多组件切换的过渡](#51多组件切换的过渡)
- [6.父子组件间传值](#6父子组件间传值)
  - [6.1父组件向子组件传值](#61父组件向子组件传值)
  - [6.2子组件调用父组件的方法(即子组件向父组件传值)](#62子组件调用父组件的方法即子组件向父组件传值)
- [7.使用ref获取DOM元素/组件的引用](#7使用ref获取dom元素组件的引用)

## 1.组件化和模块化的区别
- 组件化： 从UI角度进行划分，方便UI组件的重用；
- 模块化： 从代码逻辑角度进行划分，保证职能单一。

## 2.定义全局组件的方式
- Vue.extend()  
  ```js
  var customComp = Vue.extend({
    template: '<div>使用Vue.extend()创建的组件</div>'
  })
  Vue.component('custom-comp', customComp)
  ````
- 直接在Vue.component()中定义组件  
  ```js
  Vue.component('custom-comp', {
    template: '<div>直接在Vue.component()中定义组件</div>'
  })
  ```
- 使用 `<template>` 组件  
  ```js
  Vue.component('custom-comp', {
    template: '#template'
  })
  ```
  然后在 `<body>` 中 `#app` 之外的区域定义 `<template>` 模板
  ```html
  <body>
    <div id="#app">
      ...
    </div>
    <template id="template">
      <div>这是使用&lt;template&gt;创建的组件</div>
    </template>
  </body>
  ```
  > 这种创建方式的好处是**HTML模板有智能提示**。

> 注意事项：
> 组件定义时如果使用驼峰命名，使用组件时必须转换成中划线风格。

## 3.定义私有组件
给Vue实例传入 `components` 属性
```js
var vm = new Vue({
  ...
  components: {
    'custom-comp': {
      template: '<div>私有组件</div>'
    }
  }
})
```

## 4.组件中的data
组件和Vue实例类似，也可以拥有 `data` 、 `methods` 等属性，但是组件的 `data` 和Vue实例的 `data` 不太一样。  
组件中 `data` 属性必须是一个函数，并且该函数返回一个对象
```js
Vue.component('custom-comp', {
  template: '<div>custom-comp</div>',
  data: function (){
    return {
      msg: 'hello'
    }
  }
})
```
这样设计的原因： 防止多处或多个组件引用同一份数据，保证每一个组件的 `data` 不会被其它组件影响。

## 5.组件切换
- 使用 `v-if/v-else` 指令来切换  
  ```html
  <login-component v-if="isLogin"></login-component>
  <register-component v-else="isLogin"></register-component>
  ```
  > 只限于两个组件间切换，多个组件可以使用 `<component>` 组件。
- 使用 `<component>` 组件
  ```html
  <component :is="btnName"></component>
  ```
  `v-bind:is` 绑定一个标识组件的名字的变量，通过改变该变量为不同组件的名字【这里名字可以直接写驼峰命名的而不必转换成中划线】来实现组件的切换。

### 5.1多组件切换的过渡
直接在 `<component>` 组件外部包裹 `<transition>` 即可。  
```html
<transition>
  <component :is="viewName"></component>
<transition>
```

## 6.父子组件间传值
### 6.1父组件向子组件传值
父组件向子组件传值，通过向子组件传递属性的方式：  
> 注意： 属性名不要用中划线，最好不要使用驼峰，都用小写，与`props`中定义的一致。  
```html
<component is="sonComp" :parentmsg="parentMsg"></component>
```
同时子组件需要在 `props`属性中指明 `parentmsg` 项：  
```js
Vue.component('sonComp', {
  // ...
  props: ['parentmsg']
})
```
> 子组件的`data`中存放的是子组件的私有数据，可读可写；而`props`中存放的是外界传递过来的数据，最好作为只读数据。

### 6.2子组件调用父组件的方法(即子组件向父组件传值)
父组件向子组件传递方法，同样通过向子组件传递属性的方式：
> 方法属性的名称同样最好使用全小写。  
```html
<component is="sonComp" @submitmsg="handleMsgFromSon"></component>
```
子组件中调用该方法：  
```js
handleSendMsgToParent(){
  // 通过 **this.$emit(方法名，参数)** 来调用父元素传递过来的方法
  this.$emit('submitmsg', this.sonMsg)
}
```

## 7.使用ref获取DOM元素/组件的引用
```html
<input ref="nameInputRef" type="text" value=""/>
```
使用该ref指向的元素：
```js
handleGetFocus(){
  // 通过 **this.$refs.nameInputRef** 获取到该DOM元素， 让其获取焦点
  this.$refs.nameInputRef.focus()
}
```