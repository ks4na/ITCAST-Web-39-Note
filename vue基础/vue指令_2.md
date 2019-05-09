# Vue 指令- part2

- [品牌CRUD页面总结](#品牌crud页面总结)
- [过滤器](#过滤器)
  - [全局过滤器](#全局过滤器)
  - [私有过滤器](#私有过滤器)
- [按键修饰符](#按键修饰符)
  - [常用按键别名](#常用按键别名)
  - [支持自定义按键别名](#支持自定义按键别名)
- [自定义指令](#自定义指令)
  - [定义全局指令](#定义全局指令)
  - [定义私有指令](#定义私有指令)
  - [自定义指令函数的钩子函数](#自定义指令函数的钩子函数)
    - [钩子函数的参数](#钩子函数的参数)
  - [自定义指令函数的简写方式](#自定义指令函数的简写方式)

## 品牌CRUD页面总结
0. form中只有一个input时， 按Enter键会直接提交form，解决方案: form添加`onsubmit="return false"`
1. 查找数组中某一项的索引： `.findIndex(item => item.id === id)`  
   字符串中是否包含某一项： `.includes(substring)`
2. 指定事件处理函数时可以传入参数： `@click="deleteItem(12)"`
3. Vue的`v-for`指令中可以传入函数：`v-for="item in handleSearch()"`
4. vscode的bootstrap代码段提示插件： `bootstrap 3 snippets`,安装该插件之后，想要生成bootstrap的panel组件的代码段时，只需要输入 `bs3-panel` 即可生成代码。

## 过滤器
过滤器通常用于格式化一些字符串，如时间等。  
过滤器可以在 `插值表达式` 和 `v-bind` 表达式中使用， 用 " | " 来指示：  
```js
<p>{\{time | timeFormatter('yyyy-MM-dd')}}</p>
```  
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

