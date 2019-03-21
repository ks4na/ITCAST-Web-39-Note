# 正则表达式

- 正则表达式基本语法
- JavaScript中的正则对象的使用

## 正则表达式简介

### 什么是正则表达式

正则表达式（Regular Expression）：用于匹配规律规则的表达式。

### 正则表达式的作用

正则表达式通常被用来检索、替换或提取符合某个模式(规则)的文本。

## 正则表达式的组成

- 普通字符
- 元字符 - 正则表达式中有特殊意义的字符，如 `\d` 、 `\w` 等

### 元字符

| 元字符 | 说明                             |
| ------ | -------------------------------- |
| \d     | 匹配单个任意数字                 |
| \D     | 匹配单个任意非数字               |
| \w     | 匹配单个任意数字、字母或下划线   |
| \W     | 匹配单个任意非数字、字母、下划线 |
| \s     | 匹配单个空白符（空格或换行）     |
| \S     | 匹配单个非空白符                 |
| .      | 匹配单个非换行符                 |
| ^      | 匹配行首的文本（以谁开始）       |
| $      | 匹配行尾的文本（以谁结束）       |

### 限定符

| 限定符 | 说明             |
| ------ | ---------------- |
| *      | 匹配零个或任意个 |
| +      | 匹配一个或任意个 |
| ？     | 匹配零个或一个   |
| {n}    | 匹配n个          |
| {n,}   | 匹配n个或更多个  |
| {n,m}  | 匹配n到m个       |

> 正则表达式默认是**贪婪匹配模式**，非贪婪模式只需要在限定符后面加上一个 `?` 。

```js
var str = '<p>this is para<span>this is span</span></p>'
var reg = /<.+>/g
console.log(str.match(reg))  
// ["<p>this is para<span>this is span</span></p>"]

var reg2 = /<.+?>/g
console.log(str.match(reg2))
// ["<p>", "<span>", "</span>", "</p>"]
```

###  其它

```
[  ]				匹配内部任意一个字符
[^ ]				匹配除了内部的字符之外的任意一个字符
\					转义符
|					或
()					分组
						e.g. gr(a|e)y 匹配gray和grey
[\u4e00-\u9fa5]  	匹配汉字
```

[在线测试正则](https://c.runoob.com/front-end/854)

## JavaScript中使用正则表达式

### 创建正则对象

方式1：

```js
var regExp = new RegExp('\\d+', 'gi')
```

方式2：

```js
var regExp = /\d+/gi
```

参数：

- i - 忽略大小写
- g - 全局匹配
- gi - 全局匹配 + 忽略大小写

### js中与正则相关的方法

- **正则对象**
  - test() - 匹配则返回true， 否则返回false
  - exec() - 获取单个匹配项的信息数组，没有则返回null，可以通过循环遍历出所有匹配项的信息
- **String对象**
  - match() - 返回所有匹配项组成的数组
  - split() - 分割字符串
  - replace() - 替换字符串
  - search() - 返回第一个匹配项的索引【同`indexOf` ，但是支持正则表达式】

### 正则匹配

```js
var str = '2019-3-20'
var reg = /\d{4}-\d{1,2}-\d{1,2}/g
console.log(reg.test(str))  // true
```

### 正则提取

```js
var str = '2019-3-20'
var reg = /\d+/g

// 方法1： 使用String的match方法
console.log(str.match(reg))  //  ["2019", "3", "20"]

// 方法2： 使用正则对象的exec方法
var x
var resultArr = []
while(x = reg.exec(str)){
    resultArr.push(x[0])
}
console.log(resultArr)	// ["2019", "3", "20"]
```

### 分组提取

```js
var str = '2019-3-20'
var reg = /(\d{4})-(\d{1,2})-(\d{1,2})/g

// 正则表达式中的()作为分组来使用，获取分组匹配到的结果用RegExp.$1 $2 $3....来获取
if(reg.test(str)){
    console.log(RegExp.$1, RegExp.$2, RegExp.$3)
}

// 4. 提取邮件中的每一部分
var reg = /(\w+)@(\w+)\.((\w+)(\.\w+)?)/
var str = "123123@xx.com.cn"
if (reg.test(str)) {
  console.log(RegExp.$1)
  console.log(RegExp.$2)
  console.log(RegExp.$3)
}
```

### 正则替换

```js
// 1. 去除所有空白符
var str = "   123AD  asadf\n   asadfasf  adf "
str = str.replace(/\s/g, '')
console.log(str)  // 123ADasadfasadfasfadf

// 2. 替换所有的 , 和 ，为 .
var str = "abc,efg,123，abc,123，a"
str = str.replace(/,|，/g, ".")
console.log(str)
```

