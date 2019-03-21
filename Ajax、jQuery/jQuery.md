# jQuery

## 入口函数

| 原生js             | jQuery对应方法                               | 说明                                 |
| ------------------ | -------------------------------------------- | ------------------------------------ |
| `window.onload`    | `$(window).load()`                           | 包括图片在内的所有文件加载完成后执行 |
| `document.onready` | `$(document).ready()` 或者 `$(function(){})` | 文档结构加载完成执行                 |

## 选择器

| 选择器                                                     | 说明            |
| ---------------------------------------------------------- | --------------- |
| `$('li.cls')`                                              | 标签+类名选择器 |
| `$('span, li, div')`                                       | 多条件选择器    |
| `$('ul>li:eq(0)')` /`$('ul>li:gt(3)')`/ `$('ul>li:lt(2)')` | 索引选择器      |

> 获取ele元素的索引: `$(ele).index()`

##  获取兄弟元素

- `next()` / `prev()`
- `nextAll()` / `prevAll()`
- `siblings()`

## 链式编程

原理： 方法结束返回当前对象。

**断链** ：调用方法后不是返回当前对象。

断链后恢复方法： 调用 `end()` 方法。

```js
// 要求： 将当前元素后面的所有兄弟元素添加cls类，前面的所有兄弟元素移除cls类
// 错误写法
$(this).nextAll().addClass('cls').prevAll().removeClass('cls')

//正确写法
$(this).nextAll().addClass('cls').end().prevAll().removeClass('cls')
```

##  jQuery动画

- `show([ms[, callback]])` / `hide([ms[, callback]])`
- `fadeIn([ms[, callback]])` / `fadeOut([ms[, callback]])`
- `slideDown([ms[, callback]])` / `slideUp([ms[, callback]])`
- `animate({}, ms, callback)`
- `stop()`  - 暂停当前动画

## 元素相关方法

### 创建元素

```js
// 方式一：
var $a = $('<a href="http://www.a.com">link</a>')

// 方式二：
$div.html('<p>this is a paragraph</p>')
```

### 添加元素

```js
$parent.append($child)  // 追加到parent内部末尾
$parent.prepend($child)  // 添加到parent内部头部

$child.appendTo($parent)  // 子元素追加到父元素末尾
$child.prependTo($parent)  // 子元素插入到父元素头部

$ele.after($newEle)  // 新元素放到已有元素的后面
$ele.before($newEle)  // 新元素放到已有元素的前面
```

### 移除元素

```js
// 清空元素内部
$ele.html('')
$ele.empty()

// 移除元素自身
$ele.remove()
```

###  克隆元素

```js
$cloneEle = $ele.clone()  // 括号内参数自行百度
```

## attr和prop

`attr` 用于获取常规属性；

`prop` 用于`selected、disabled、checked` 等之类的设置 `true、false` 的属性。

```js
$ele.prop('checked')  // 获取checked属性值，只会返回true或false
$ele.prop('checked', true)  // 设置checked属性
```

## jQuery获取元素尺寸

| jQuery方法              | DOM方法                                                      | 说明                                     |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `$ele.width()`          | `ele.style.width`,<br />`parseInt(getComputedStyle(ele).width)` | 元素的 width（不包括padding）            |
| `$ele.innerWidth()`     | `ele.clientWidth`                                            | 元素的 width + padding                   |
| `$ele.outerWidth()`     | `ele.offsetWidth`                                            | 元素的 width + padding + border          |
| `$ele.outerWidth(true)` | `ele.offsetWidth + parseInt(getComputedStyle(ele).margin)*2` | 元素的 width + padding + border + margin |

## jQuery事件相关API

`on(type[, selector], fn)`

`off([type[, selector[, fn]]])`

- `on` 可以绑定多个事件处理函数fn
- `off` 
  - 有selector为解除委托事件
    - `off(type, '**')` - 移除所有type类型的委托事件
  - 无selector情况下
    - `off(type, fn)` - 移除type类型的fn
    - `off(type)` - 移除type类型所有事件函数
    - `off()` - 移除所有绑定事件

> 注：
>
> 原生绑定事件的方式：
>
> 1. 赋值 onclick = fn
> 2. addEventListener(type, fn, useCapture)
>
> 这两种绑定事件的方式分别对应不同的移除事件方法，且不可以混用，否则无法移除对应的事件。

### 触发事件

- $ele.click()
- $ele.trigger('click')
- $ele.tirggerHandler('click')

> triggerHandler这种触发方式只会执行该事件绑定的事件处理函数，而不会触发浏览器默认行为。

## jQuery多库共存问题

场景：

$ 符号已被其它地方声明使用了， 或者引用了2个版本的jQuery库， 后引入的库中的 \$ 会覆盖前面引入的。

查看正在使用的jQuery版本号：

```js
$.fn.jquery
```

解决方法：

```js
// 让当前jQuery释放对$符的控制权
$.noConflict()
// 此时还可以使用jQuery代替$，如果还需要释放jQuery，则noConflict方法中传入true,
// 可以自定义变量接收当前的jQuery引用
var $1_12_1 = $.noConflict(true)

console.log($1_12_1.fn.jquery)
```

