# Web API - BOM介绍及应用

## BOM的概念

BOM(Browser Object Model) 是指浏览器对象模型。

浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。BOM由多个对象组成，其中代表浏览器窗口的Window对象是BOM的顶层对象，其他对象都是该对象的子对象。

我们在浏览器中的一些操作都可以使用BOM的方式进行编程处理，比如：刷新浏览器、后退、前进、在浏览器中输入URL等。

## BOM的顶级对象 - window

window是浏览器的顶级对象，当调用window下的属性和方法时，可以省略window。

> 注意：window中一些如 window.name, window.top的特殊属性，最好不要让变量取这些名字。

 ## 对话框

- alert()
- prompt()
- confirm()

## 页面加载事件

- onload 

  页面加载完成执行，**会等待js、css、图片下载完成**，执行时机较晚；

  而写在body末尾的js会在页面元素创建完成执行。

  ```js
  window.onload = function () {
    // 当页面加载完成执行
    // 当页面完全加载所有内容（包括图像、脚本文件、CSS 文件等）执行
  }
  ```

- onunload

  页面卸载(关闭或刷新)时执行。**onunload事件中无法使用对话框**，window对象被冻结。 

  可以在onunload事件中做一些清除缓存的操作。

## 定时器

### setTimeout() 和 clearTimeout()

一段时间之后执行，只执行一次。

```js
// 创建一个定时器， 1000ms后执行，返回定时器标识
var timerId = setTimeout(function (){
    console.log('hello world')
}, 1000)

// 清除定时器
clearTimeout(timerId)
```

### setInterval() 和 clear Interval()

每隔一段时间执行一次。**不会立即执行一次。**

```js
// 创建定时器， 每隔1000ms执行一次，返回定时器标识
var timerId = setInterval(function (){
    console.log('hello world')
}, 1000)

// 清除定时器
clearInterval(timerId)
```

## location对象

location可以获取或者设置浏览器地址栏的URL。

location的属性：

- href - 地址栏中的值
- search/pathname/host/hostname......

location的方法：

- assign() - 跳转，可以后退到历史网址

  ```js
  location.assign('http://www.baidu.com')  
  // 相当于location.href = 'http://www.baidu.com'
  ```

- replace() - 跳转但不记录历史网址

   ```js
  location.replace('http://www.baidu.com')
  // 跳转到百度首页，但是无法后退到之前的网址
   ```

- reload() - 同刷新按钮【F5】,参数为true强制从服务器获取网页，而非缓存【同CTRL+F5】

  ```js
  location.reload(true)  // 强制刷新
  ```

### URL

统一资源定位符 (Uniform Resource Locator, URL)

**URL的组成**

```
scheme://host:port/path?query#fragment
scheme:通信协议
host:主机
port:端口号
path:路径
query:查询
fragment:信息片断
```

## history对象

- forward() - 前进
- back() - 后退
- go() - 1: 前进； -1：后退；0：刷新

## navigator对象

- userAgent - 设备标识

