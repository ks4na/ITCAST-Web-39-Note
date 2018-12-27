# html5 day01 笔记

### 1. 浏览器内核

- 最初分为`渲染引擎`和`JS引擎`，后来`JS引擎`越来越独立，就倾向于指`渲染引擎`了。

- 各个浏览器对应的内核

- | 浏览器  | 内核                                   |
  | ------- | -------------------------------------- |
  | IE/Edge | Trident/EdgeHTML                       |
  | firefox | Gecko                                  |
  | chrome  | Chromium/blink（算是webkit的一个分支） |
  | safari  | webkit                                 |
  | opera   | blink                                  |

### 2. Web标准

- 分为三方面：
  - 结构标准： html；
  - 样式标准： css；
  - 行为标准： js。



### 3.html语法骨架	

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
    </body>
</html>
```

- 文档类型 `<!DOCTYPE html>`:  声明使用html5版本。
- `<meta charset="UTF-8">` : 声明网页的编码。



### 4. 排版标签

- ` <h1>`标签一般只有一个，用于`logo`。



### 5. 文本格式化标签

| 标签                       | 显示效果                          |
| -------------------------- | --------------------------------- |
| <b></b>/ <strong></strong> | 加粗（推荐使用<strong></strong>） |
| <i></i>/<em></em>          | 斜体（推荐使用<em></em>）         |
| <s></s>/<del></del>        | 删除线（推荐使用<del></del>)      |
| <u></u>/<ins></ins>        | 下划线（推荐使用<ins></ins>）     |

### 6. 图像标签

- `<img src="" alt="" title=""/>`
  - alt ： 图像显示失败的替换文字
  - title ： 鼠标悬停显示的文字



### 7. 锚点

- `<a href="#target">XXX</a>`
- `<tag id="target"></tag>`
- 点击a标签即可跳转到指定tag标签处。



### 8. base标签

- 指定整个页面的链接打开方式

- 注意 `base` 标签必须写在 `head` 标签内部

- 示例：

  ```html
  <base target="_blank"/>
  ```

- 另外， 链接默认打开方式是 `_self` （当前页面打开链接）。



### 9. 特殊字符标签

| 符号    | 代码     |
| ------- | -------- |
| &amp;   | &amp；   |
| &copy;  | &copy；  |
| &times; | &times； |



