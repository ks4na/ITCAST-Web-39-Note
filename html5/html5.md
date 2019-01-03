# html5 笔记

## 1. 浏览器内核

- 最初分为 `渲染引擎` 和 `JS引擎` ，后来 `JS引擎` 越来越独立，就倾向于指 `渲染引擎` 了。

- 各个浏览器对应的内核

| 浏览器  | 内核                                   |
| ------- | -------------------------------------- |
| IE/Edge | Trident/EdgeHTML                       |
| firefox | Gecko                                  |
| chrome  | Chromium/blink（算是webkit的一个分支） |
| safari  | webkit                                |
| opera   | blink                                  |

## 2. Web标准

- 分为三方面：
  - 结构标准： html；
  - 样式标准： css；
  - 行为标准： js。

## 3.html5语法骨架	

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

## 4. 排版标签

- ` <h1>`标签一般只有一个，用于`logo`。

## 5. 文本格式化标签

| 标签                       | 显示效果                          |
| -------------------------- | --------------------------------- |
| `<b></b>`/ `<strong></strong>` | 加粗（推荐使用`<strong></strong>`） |
| `<i></i>`/`<em></em>`          | 斜体（推荐使用`<em></em>`）         |
| `<s></s>`/`<del></del>`      | 删除线（推荐使用`<del></del>`)      |
| `<u></u>`/`<ins></ins>`        | 下划线（推荐使用`<ins></ins>`）     |

## 6. 图像标签

- `<img src="" alt="" title=""/>`
  - alt ： 图像显示失败的替换文字
  - title ： 鼠标悬停显示的文字

## 7. 锚点

- `<a href="#target">XXX</a>`
- `<tag id="target"></tag>`
- 点击a标签即可跳转到指定tag标签处。


## 8. base标签

- 指定整个页面的链接打开方式

- 注意 `base` 标签必须写在 `head` 标签内部

- 示例：

  ```html
  <base target="_blank"/>
  ```

- 另外， 链接默认打开方式是 `_self` （当前页面打开链接）。


## 9. 特殊字符标签

| 符号    | 代码     |
| ------- | -------- |
| &amp;   | &amp；   |
| &copy;  | &copy；  |
| &times; | &times； |

## 10. 表格

**表格骨架**

`emmet` 语法： `table>caption+thead>tr>td*2+^^tbody>tr*2>td*2`

```html
<table>
    <caption></caption>
    <thead>
        <tr>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```

**表格属性**

- border ： 边框
- cellspacing ： 单元格之间的间距
- cellpadding ： 单元格内间距
- width ： 宽度
- height ： 高度
- align ： 表格在网页中的水平对齐方式

**单元格属性**

- rowspan ： 行合并
- colspan ： 列合并

## 11. html5常用标签

| 标签    | 语义                   |
| ------- | ---------------------- |
| header  | 定义文档的头部         |
| nav     | 定义文档的导航部分     |
| footer  | 定义文档的页脚         |
| article | 定义文档的主题内容部分 |
| section | 定义文章中的节         |
| aside   | 定义文档的侧边部分     |

## 12. datalist标签

配合 `input` 使用，让 `input` 具有下拉选择和提示功能。

```html
<input type="text" list="target"/> <!-- input指定list属性指向datalist的id -->
<datalist id="target">
    <option>aaaa</option>
    <option>aabb</option>
    <option>acc</option>
</datalist>
```

## 13.html5 input新属性

| 属性         | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| autofocus    | 页面加载时自动获得焦点                                       |
| autocomplete | 是否启用自动完成功能，可选值： “on“ / ”off“，需要满足条件：1. 控件有name属性；2.提交之后 |
| accesskey    | 设置快捷键，采用 `alt + 字母` 的形式激活                     |

## 14.audio音频

普通写法：

```html
<audio src="music.mp3" loop controls autoplay>
    您的浏览器不支持播放声音。
</audio>
```

属性：

- loop - 循环播放
- controls - 显示播放控件
- autoplay - 音频就绪后自动播放
- src - 音频url地址

兼容处理的方式：【mp3 、wav（或ogg）都有即可】

~~~html
<audio controls>
    <source src="music.mp3"/>
    <source src="music.wav"/>
    您的浏览器不支持播放声音。
</audio>
~~~

## 15.video视频

普通写法： 参考 `audio` 标签。

兼容处理方式：【MP4、ogg（或者WebM）都有即可】

~~~html	
<video autoplay controls>
    <source src="movie.mp4"/>
    <source src="movie.ogg"/>
     您的浏览器不支持播放视频。
</video>
~~~





