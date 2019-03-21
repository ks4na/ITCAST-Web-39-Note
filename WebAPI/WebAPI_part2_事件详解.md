# Web API - 事件详解及应用

## 注册事件的方式

**给onclick赋值一个函数**
```js
ele.onclick = function (){
    // some code ...
}
```
**使用addEventListener**

```js
ele.addEventListener('click', function (){
    // some code ...
})
```

> 两种注册事件方式的区别：
>
> 1. 第一种是赋值操作，无法绑定多个事件；第二种可以绑定多个事件；
> 2. 第一种只在冒泡阶段触发；第二种可以在冒泡阶段或捕获阶段触发。【后面详细解释】

## 移除事件

**onclick赋值为null**

```js
ele.onclick = function (){
    alert('hello world')
    ele.onclick = null  // 移除点击事件
}
```

**removeEventListener(type, fn)**

addEventListener绑定的事件处理函数只能通过removeEventLister方式移除，**无法通过赋值为null的方式移除**。

removeEventListener移除事件处理函数需要传入函数名，所以**使用此方法不能是绑定的匿名函数**。

```js
function btnClick(){
    alert('clicked')
}
ele.addEventListener('click', btnClick)
ele.removeEventListener('click', btnClick)  // 移除点击事件
```

## 事件的三个阶段

1. 捕获阶段
2. 当前目标阶段
3. 冒泡阶段

> 事件对象的eventPhase属性可以查看事件触发时所处的阶段：
>
> eventPhase值为 1 - 捕获阶段；2 - 当前目标阶段；3 - 冒泡阶段。

`addEventListener(type , fn [, useCapture])` ，其中第三个参数`useCapture` 控制捕获阶段还是冒泡阶段触发该事件，默认为false，即冒泡阶段触发。

而 `onclick = fn` 的方式，只能在冒泡阶段触发。

## 事件委托

给需要添加事件的元素的父元素添加监听事件，避免为每个子元素添加相同的监听事件。

原理： 事件冒泡机制。

```html
<body>
    <ul id="ul">
       	<li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var ul = document.getElementById('ul')
        
        ul.addEventListener('click', function (e){
            console.log(e.target)  // e.target 即为真正触发事件的li元素
        })
    </script>
</body>
```

### 事件对象 - e

```js
var btn = document.getElementById('btn')
btn.onclick = function (e){
    console.log(e)  // e 即为事件对象
}
```

事件对象e 在老版本浏览器有兼容性问题, 处理方式： `e = e || window.event` 。

```js
e.eventPhase 	// 事件发生的阶段 1：捕获阶段；2：当前目标阶段；3.冒泡阶段

e.target  		// 真正触发事件的对象
e.currentTarget // 事件处理函数所属的对象
```

**e.type**

e.type --- 事件的类型，如click，mouseover...

用途： 将一个元素的多个处理事件合并到一个函数中定义。

例子：

```js
var btn = document.getElementById('btn')

btn.onclick = fn
btn.onmouseover = fn
btn.onmouseout = fn

function fn(e){
    e = e ||window.event
    switch(e.type){
        case 'click':
            console.log('click')
            break
        case 'mouseover':
            console.log('mouseover')
            break
        case 'mouseout':
            console.log('mouseout')
            break
        default:
    }
}
```

### 获取鼠标位置

- e.clientX / e.clientY - 获取鼠标相对浏览器可视区域的位置
- e.pageX / e.pageY - 获取鼠标相对整个页面的位置【**IE9+支持**】



```js
// 解决e.pageX / e.pageY 存在的兼容问题：

// 1. 获取页面滚动出去的距离
var top = document.documentElement.scrollTop || document.body.scrollTop
var left = document.documentElement.scrollLeft || document.body.scrollLeft
// *补充：使用document.documentElement还是document.body取决于有没有DOCTYPE。

// 2. 与e.clientX / e.clientY 相加即可
```

**获取鼠标在元素中的位置**

获取鼠标在页面中的位置，减去页面元素在页面中的位置即可。

```js
// 获取页面元素在页面中的位置：
ele.offsetLeft
ele.offsetTop

// 鼠标在元素中的位置：
var left = e.pageX - ele.offsetLeft
var top = e.pageY - ele.offsetTop
```

## 阻止默认行为

1. 事件处理函数末尾加上 `return false`
2. 使用 `e.preventDefault()`

例子：

```html
<!-- 阻止a标签跳转行为 -->
<a id="link" href="www.baidu.com">点击</a>
<script>
    var link = document.getElementById('link')
    link.onclick = function (e) {
        alert('clicked')
        // 1. 第一种方式
        // return false
        // 2. 第二种方式
        // e.preventDefault()
    }
</script>
```

## 取消事件冒泡

event.stopPropagation()

> 该方法是阻止事件的传播，不只是阻止事件冒泡，还可以在事件捕获阶段阻止传播。



`return false` 是取消事件冒泡并且阻止默认行为。





