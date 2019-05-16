# vue补充

- [侦听器-watch属性](#侦听器-watch属性)
- [计算属性-computed属性](#计算属性-computed属性)
  - [computed属性和methods方法的对比](#computed属性和methods方法的对比)
  - [computed属性和watch的属性的对比](#computed属性和watch的属性的对比)

## 侦听器-watch属性
vue实例的watch属性用于监视数据的变化,一旦监视的数据发生变化,则触发相应的处理函数.  
```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 'a',
    b: 'b',
  },
  // ...
  watch: {
    a: function(newVal, oldVal){
      console.log(newVal, oldVal)
    }
  }
})
```
`watch` 属性还可以监听路由等属性:  
```js
//...
watch: {
  '$route.path': function(newVal, oldVal){
    console.log(newVal, oldVal)
  }
}

//...
```

## 计算属性-computed属性
vue实例的computed属性中定义的计算属性, 计算的结果会被缓存, 只有当其中的依赖的数据发生变化时才会自动重新计算.
```js
var vm = new Vue({
  el: '#app',
  data: {
    a: 'a',
    b: 'b',
  },
  // ...
  computed: {
    addResult: function(){
      return Number(this.a) + Number(this.b)
    }
  }
})
```
```html
<div id="app">
  <div>a: {{a}}</div>
  <div>b: {{b}}</div>
  <div>addResult: {{addResult}}</div>
</div>
```
### computed属性和methods方法的对比
computed属性**基于它们的响应式依赖进行缓存**,只有当其中依赖的数据发生变化时才会重新计算,  
而methods方法在每次触发重新渲染时都会再次执行.  

### computed属性和watch的属性的对比
computed属性主要当作属性来使用,   
而watch的属性主要用来监视某些数据的变化,从而进行一些逻辑处理.