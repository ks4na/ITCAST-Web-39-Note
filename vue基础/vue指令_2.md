# Vue 指令- part2

- [品牌CRUD页面总结](#%E5%93%81%E7%89%8Ccrud%E9%A1%B5%E9%9D%A2%E6%80%BB%E7%BB%93)
- [过滤器](#%E8%BF%87%E6%BB%A4%E5%99%A8)
  - [全局过滤器](#%E5%85%A8%E5%B1%80%E8%BF%87%E6%BB%A4%E5%99%A8)
  - [私有过滤器](#%E7%A7%81%E6%9C%89%E8%BF%87%E6%BB%A4%E5%99%A8)
- [按键修饰符](#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
  - [常用按键别名](#%E5%B8%B8%E7%94%A8%E6%8C%89%E9%94%AE%E5%88%AB%E5%90%8D)
  - [支持自定义按键别名](#%E6%94%AF%E6%8C%81%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%89%E9%94%AE%E5%88%AB%E5%90%8D)
- [自定义指令](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4)
  - [定义全局指令](#%E5%AE%9A%E4%B9%89%E5%85%A8%E5%B1%80%E6%8C%87%E4%BB%A4)
  - [定义私有指令](#%E5%AE%9A%E4%B9%89%E7%A7%81%E6%9C%89%E6%8C%87%E4%BB%A4)
  - [自定义指令函数的钩子函数](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4%E5%87%BD%E6%95%B0%E7%9A%84%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)
    - [钩子函数的参数](#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E7%9A%84%E5%8F%82%E6%95%B0)
  - [自定义指令函数的简写方式](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4%E5%87%BD%E6%95%B0%E7%9A%84%E7%AE%80%E5%86%99%E6%96%B9%E5%BC%8F)

## 品牌CRUD页面总结
1. 查找数组中某一项的索引： `.findIndex(item => item.id === id)`  
   字符串中是否包含某一项： `.includes(substring)`
2. 指定事件处理函数时可以传入参数： `@click="deleteItem(12)"`
3. Vue的`v-for`指令中可以传入函数：`v-for="item in handleSearch()"`
4. vscode的bootstrap代码段提示插件： `bootstrap 3 snippets`,安装该插件之后，想要生成bootstrap的panel组件的代码段时，只需要输入 `bs3-panel` 即可生成代码。

## 过滤器
过滤器通常用于格式化一些字符串，如时间等。  
过滤器可以在 `插值表达式` 和 `v-bind` 表达式中使用， 用 " | " 来指示：  
`<p>{{time | timeFormatter('yyyy-MM-dd')}}</p>`  
过滤器可以传入参数，但第一个参数始终为前面的变量。

### 全局过滤器
定义全局过滤器：`Vue.filter(name, function) ` 
```js
Vue.filter('timeFormatter', (data, pattern) => {
  // ...
  return data
})
```

### 私有过滤器
定义私有过滤器：在实例化Vue对象时传入`filters`字段  
```js
var vm = new Vue({
  filters: {
    timeFormatter: (data, pattern) => {
      // ...
      return data
    }
  }
})
```
> 私有过滤器和全局过滤器名称相同时，优先使用私有过滤器。

## 按键修饰符
`@keyup` 事件监听 `Enter` 键的写法： `@keyup.enter`。
### 常用按键别名
`enter` , `esc` , `space` , `del` (监听的是删除和退格键) , `up` , `down` , `left` , `right` 。
### 支持自定义按键别名
例如想使用f1键的别名写法：
```js
Vue.config.keyCodes.f1 = 112
```

## 自定义指令
### 定义全局指令
例如想定义一个鼠标获取焦点的指令 `v-focus` :  
```js
// 定义指令时不需要加 v- 前缀
Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})
```

### 定义私有指令
上面全局指令的私有指令写法：  
```js
var vm = new Vue({
  // ...
  directives: {
    focus: {
      inserted: (el) => { el.focus() }
    }
  }
})
```

### 自定义指令函数的钩子函数
全部钩子函数如下：
- bind: 指令首次绑定到元素上时触发
- inserted： 元素插入父元素中时触发
- update： 元素VNode更新时触发
- componentUpdated： 元素及子元素的VNode全部更新完触发
- unbind： 指令与元素解绑时触发

#### 钩子函数的参数
`el`, `binding`, `vnode`, `oldVnode` [详见文档]

### 自定义指令函数的简写方式
由于大部分情况下，可能只需要用到 `bind`, `update` 这两个钩子函数，所以提供简写方式：  
```js
Vue.directive('color-swatch', (el, binding) => {
  el.style.backgoundColor = binding.value
})
```

