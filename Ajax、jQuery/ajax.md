# Ajax

## Ajax含义

Asynchronous JavaScript and XML:  异步JavaScript和XML。

## 隐藏iframe实现页面局部更新

创建一个隐藏的iframe，指定name属性，将form表单的target属性设置为iframe的name，即可将form提交返回的数据在iframe中显示：

```html
  <form action="00iframe.php" method="post" target="hiddenIframe">
      username: <input type="text" name="uname" id="uname"><br />
      password: <input type="text" name="pwd" id="pwd">
      <p id="hint"></p>
      <input type="submit" value="submit">
  </form>
  <iframe name="hiddenIframe" src="" frameborder="0" width="0" height="0"></iframe>
```

后台返回script脚本,通过 `parent.document` 实现对iframe的父窗口的DOM操作：

```php
<?php
  $uname = $_POST['uname'];
  $pwd = $_POST['pwd'];
  if($uname == 'admin' && $pwd == '123'){
?>
  <script>
    parent.document.querySelector('#hint').innerHTML = '<?php echo '登录成功'?>'
  </script>
<?php
  }else{
?>
  <script>
    parent.document.querySelector('#hint').innerHTML = '<?php echo '用户名或密码错误'?>'
  </script>
<?php
  }
?>
```

## 原生Ajax实现页面局部更新

### 步骤

```js
// 1. 创建XMLHttpRequest对象
var xhr = new XMLHttpRequest()
// 2. 配置请求信息
xhr.open('get', './1.php?value=123', true)
// 3. 发送数据
xhr.send(null)
// 4. 指定回调函数
xhr.onreadystatechange = function (){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            var data = xhr.responseText
            console.log(data)
        }
    }
}
```

### 各阶段分析

1. 创建XMLHttpRequest对象

   - IE6不支持XMLHttpRequest对象

2. 配置请求信息

   ```js
   xhr.open(type, url, async)
   参数：
   	type		- 类型，get,post,put,delete,head
   	url			- url地址
   	async		- 异步标记，默认true
   	
   - 如果是get请求，直接将参数拼接在url后面(url?key=value&key=value)，注意需要将参数转码防止中文乱码(encodeURI)
   
   - 如果是post请求，需要设置请求头：
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
   
   - async
   	为false时(即同步调用方式),不是在xhr.onreadystatechange回调函数中获取返回的数据，而是在send方法调用之后直接获取xhr.responseText
   ```

3. 发送数据

   ```js
   xhr.send(string)
   参数：
   	string		- 参数字符串(key=value&key=value)
   
   - get请求传入null
   ```

4. 指定回调函数

   ```
   xhr.onreadystatechange = function (){
       if(xhr.readyState === 4){
           if(xhr.status === 200){
               var data = xhr.responseText
               console.log(data)
           }
       }
   }
   
   readyState:
   	0	- XMLHttpRequest对象未初始化（未调用send方法）
   	1	- 正在发送请求
   	2 	- 已接收到全部响应内容
   	3	- 正在解析响应内容
   	4	- 响应内容解析完成
   	
   status:	服务器响应状态
   
   responseText: 返回的数据
   ```

### 异步效果与js事件处理机制

js事件处理机制： 单线程 + 事件队列

- 可能进入事件队列的函数：
  - 定时函数
  - 事件函数
  - ajax回调函数
- js事件队列中事件的执行条件：
  - 主线程空闲
  - 事件满足执行条件

### 模仿jQuery封装ajax

```js
function ajax(obj){
    var defaults = {
        async: true,
        type: 'get',
        url: '#',
        data: {},
        dataType: 'text',
        success: function (){}
    }

    for(var key in obj){
        defaults[key] = obj[key]
    }

    // 参数序列化
    var paramStr = ''
    for(var key in defaults.data){
        paramStr += key + '=' + defaults.data[key] + '&'
    }
    if(paramStr){
        paramStr = paramStr.substring(0, paramStr.length - 1)
    }

    // 创建XMLHttpRequest对象
    var xhr = new XMLHttpRequest()

    // 配置请求信息、发送请求
    if(defaults.type === 'get'){
        // get请求需要将参数拼接到url中，且需要对参数转码，防止中文乱码
        if(paramStr){
          defaults.url += '?' + encodeURI(paramStr)
        }
        xhr.open(defaults.type, defaults.url, defaults.async)
        xhr.send(null)
    }else if(defaults.type === 'post'){
        xhr.open(defaults.type, defaults.url, defaults.async)
        // post请求需要设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(paramStr)
    }

    // 设置回调函数
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var data = xhr.responseText
                if(defaults.dataType === 'json'){
                    data = JSON.parse(data)
                }
                defaults.success(data)
            }
        }
    }
    // 如果非异步请求，就不是从回调函数中获取返回数据
    if(!defaults.async){
        var data = xhr.responseText
        if(defaults.dataType === 'json'){
            data = JSON.parse(data)
        }
        defaults.success(data)
    }
}
```

## Ajax跨域

跨域问题来自于**浏览器同源策略**的限制，包括DOM同源限制和ajax同源限制，这里只考虑ajax跨域。

**同源** ： 协议、域名、端口号都必须完全相同。只要其中任意一个不相同即为 **跨域** 。

### jsonp解决Ajax跨域问题

jsonp：`JSON with Padding` ，一种非官方的json传输协议。

本质： 动态创建script标签，通过它的src属性发送get请求，携带上回调函数名称，然后服务器端响应的内容是函数调用。

限制： 只能是GET请求。

```js
// jsonp解决跨域
function jsonp(obj){
    var defaults = {
        url: '#',
        data: {},
        jsonp: 'callback',
        jsonpCallback: ('jQuery1.11.1' + Math.random()).replace(/\W/g, '') + 
        		new Date().getTime(),
        success: function (){}
    }

    for(var key in obj){
        defaults[key] = obj[key]
    }

    // 参数序列化
    var paramStr = ''
    for(var key in defaults.data){
        paramStr += key + '=' + defaults.data[key] + '&'
    }
    if(paramStr){
        paramStr = paramStr.substring(0, paramStr.length - 1)
    }

    // 让defaults.success来处理数据
    window[defaults.jsonpCallback] = function (data){
        defaults.success(data)
    }

    // 创建script标签
    var script = document.createElement('script')
    defaults.url += '?' + defaults.jsonp + '=' + defaults.jsonpCallback
    if(paramStr){
        defaults.url +=  '&' + paramStr
    }
    script.src = defaults.url
    document.querySelector('head').appendChild(script)

}

// 调用jsonp方法跨域请求数据
jsonp({
    url: 'http://localhost/PHPdemo/jsonp/jsonp.php',
    data: {
      username: 'admin',
      password: '123'
    },
    jsonp: 'cb', 			// 自定义回调函数键名，需要与后端jsonp接口中接收回调函数的形参一致
    jsonpCallback: 'foo',	// 自定义回调函数的名称
    success: function (data) {
        console.log(data)
    }
})
```

php后台jsonp接口：

```php
<?php
  $username = $_GET['username'];
  $pwd = $_GET['password'];
  $cb = $_GET['cb'];
  echo $cb.'({"username":"'.$username.'","password":"'.$pwd.'"})'
?>
```

