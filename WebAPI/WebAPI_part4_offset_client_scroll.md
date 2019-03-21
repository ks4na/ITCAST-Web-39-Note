# Web API - offset/client/scroll

## 偏移量 - offset

- offsetParent - 获取偏移参考的父级元素，如果没有任何父元素设置了非static定位，则参考的父级元素为 `body`。
- offsetLeft / offsetTop - 相对于参考父元素的偏移量
- offsetWidth / offsetHeight - 包含padding、border的总宽度

![offset图解](media/offset.png)

## 客户区大小

- clientLeft / clientTop - **左边框/上边框的大小**
- clientWidth / clientHeight - 该元素的可视区(内容+padding)大小 **【不包括滚动条】**

![client图解](media/client图解.png)

## 滚动偏移

- scrollLeft / scrollTop - 向左/向上滚动的距离
- scrollWidth / scrollHeight -  元素中存放的内容+padding（包括未显示区域）的大小 **【不包括滚动条】**

![scroll图解](media/scroll.png)

### mouseenter  与 mouseover 的区别

- mouseenter/mouseleave - 不会触发事件冒泡
- mouseover/mouseout - 会触发事件冒泡

例子：

```html
<body>
  <div id="parent">
    <div id="son"></div>
  </div>
  <script>
    var parent = document.getElementById('parent')
    var son = document.getElementById('son')

    parent.onmouseenter = function (){
      console.log('mouseenter')  // 进入son元素不会再次触发该事件
    }

    parent.onmouseover = function (){
      console.log('mouseover')  // 进入son元素会导致该事件再次触发
    }
  </script>
</body>
```

## 案例 

- [拖拽窗口案例](assets/4.拖拽案例.html)
- [弹出登录窗口+遮罩层](assets/5.登录遮罩层.html)
- [电商商品放大镜](assets/6.放大镜.html)
- [模拟滚动条(只需要滚动条拖动即可)](assets/8.模拟滚动条.html)
- 匀速动画函数
- [无缝轮播图](assets/2.轮播图.html)
- 回到顶部  
- [瀑布流](assets/1.waterfall.html)
- [像素鸟游戏](assets/像素鸟游戏/flappybird.html)
- [飞机大战游戏](assets/飞机大战游戏/planeflight.html)

## 补充

- 浏览器的宽高：`window.innerWidth`, `window.innerHeight`

- 遍历数组删除其中元素的写法**必须从后往前遍历**（或用另一个数组接收）：

  ```js
  var arr = [1,2,3,4,5,6,6,6]
  for(var i = 0; i < arr.length; i ++){
      if(arr[i] % 3 === 0){
          arr.splice(i, 1)
      }
  }
  console.log(arr)  // [1, 2, 4, 5, 6] , 错误
  //正确写法是从后往前遍历
  for(var i = arr.length - 1; i >= 0; i --){
       if(arr[i] % 3 === 0){
          arr.splice(i, 1)
      }
  }
  ```

  