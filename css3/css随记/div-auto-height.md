# div 的高度随自适应的宽度（百分比）而调整

## 思路

div 的宽度设置为百分比之后，是基于父元素的宽度来计算的，如果高度想要随宽度而调整，那么高度就得与父元素的宽度挂上钩，而 `margin/padding`设置成百分比时就是基于父元素的宽度来计算的。

## 代码

### 初步

如下代码所示， `.son` 宽度默认为父级元素 `.father` 的 `100%` ，然后设置 `padding-top` 为 `100%`，那么 `.son` 元素的 `width` 和 `padding-top` 就是相同的，此时就形成了一个正方形。

> 当然也可以使用 `margin` ，不过需要考虑让父盒子形成 `BFC`。

```html
<style>
  .father {
    width: 300px;
    border: 1px solid #000;
  }
  .son {
    padding-top: 100%;
    background-color: orange;
  }
</style>
<body>
  <div class="father">
    <div class="son"></div>
  </div>
</body>
```

### 使用伪元素设置 margin/padding 撑开容器

可以使用一个 `placeholder` 类名，配合 `::after`，把撑开容器的代码变得更加通用。

```html
<style>
  .father {
    width: 300px;
    border: 1px solid #000;
  }
  .son {
    background-color: orange;
  }
  .placeholder::after {
    content: " ";
    display: block;
    padding-top: 100%;
  }
</style>
<body>
  <div class="father">
    <div class="son placeholder"></div>
  </div>
</body>
```

### 向容器内部添加内容

向撑开的容器内部添加内容，可以给子元素加上 `position: absolute;`， `placeholder` 类加上 `position: relative`:

```html
<style>
  .father {
    width: 300px;
    border: 1px solid #000;
  }
  .son {
    background-color: orange;
  }
  .placeholder {
    position: relative;
  }
  .placeholder::after {
    content: " ";
    display: block;
    padding-top: 100%;
  }
  img {
    vertical-align: top;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
<body>
  <div class="father">
    <div class="son placeholder">
      <img src="1.jpg" alt="" />
    </div>
  </div>
</body>
```

## 原理

子元素的 `margin` 、`padding` 如果是百分比，那么都是基于父元素的宽度 `width` 来计算的。

为什么 `margin-top/margin-bottom` 和 `padding-top/padding-bottom` 也会基于父元素的 `width` 来计算？

- 因为正常流中父元素会足够高以包含其后代元素，如果根据父元素的 `height` 来计算， 就可能导致一个无限循环。

## 总结

想要让一个 div 的高度随自适应的宽度（百分比）而调整， 先给该 div 添加 `placeholder` 类名：

```css
.placeholder {
  position: relative;
}
.placeholder::after {
  content: " ";
  display: block;
  padding-top: 100%;
}
```

然后如果向该 div 中添加元素，需要将该元素绝对定位 `position: absolute;` 。
