# CSS - part4 - 2D/3D变形/动画

## 2D变形（CSS3）

### 变形转换 transform

**1. 移动 - translate(x, y)** 

写法： 

```css
transform: translate(50px, 50px);
```

其中，x、y 可以为负值，单位可以是 px，也可以是%。

**单位为%时以自身宽高为参照**，所以**可以用来实现盒子居中效果**：

```css
div {
    width: 200px;
    height: 33px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 反向移动自身宽高的一半*/
}
```

**2.  缩放 - scale(x, y)**

写法：

```css
transform: scale(0.8, 1.2);
```

scale() 的默认取值为 1,

当值在 [0.01, 0.99] 之间，缩放元素；

当值位于 [1.01, ∞) 时，放大元素。

**3. 旋转 - rotate(deg)**

写法： 

 ```css
transform: rotate(45deg);
 ```

1. 单位： deg （度数）
2. 正值 - 顺时针旋转， 负值 - 逆时针旋转

**4. 倾斜 - skew(x-deg, y-deg)**

写法：

```css
transform: skew(30deg, 30deg);
```

1. 单位： deg（度数）
2. 正值 - 负方向，负值 - 正方向
3. 只倾斜某一个方向的话，另一个写0即可

**5. 变形中心点设置 - transform-origin**

写法：

```css
transform-origin: left top;
```

可以是方位词，也可以是px 或 %。

示例：

![旋转点设置](assets\旋转点设置.png)

**6. transform 多值写法**

多个属性值之间使用空格分开即可。

```css
transfrom: translate(100px, 0) rotate(45deg);
```

## 3D 变形（CSS3）

### 1. rotateXYZ

沿着X、Y、Z轴旋转。

写法示例：

```css
transform: rotateY(45deg);
```

### 2. 透视（perspective）

- 原理： 近大远小。
- perspective： 视距， 视点距离屏幕的长短。
- 视距越大，透视效果越不明显。
- perspective属性加在3D效果的父元素身上，那么默认的视距中心就是父元素的中心位置，所以加在父元素上和加在body上会产生视觉上的区别。

**perspective-origin**

视距原点，表示从哪个位置看。

### 3. translate3d(x, y, z)

集合了 `translateX()`, `translateY()` 和 `translateZ()` 三个方法，

其中x, y 单位可以为px或者%，但是z 只能是 px。

### 4. backface-visibility(背面不可见)

可选值：visible、hidden。

案例： 两面翻转效果

![两面翻转效果](assets/backface-visibility.gif)

## 动画（CSS3)

语法格式：

```css
animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否可反向；
```

![动画属性](assets/CSS3animation.png)

`animation` 的前四个属性 animation-name、animation-duration、animation-timing-function、animation-delay 类似 `transition` 的属性。

**animation-iteration-count**

 动画播放次数。 `animation-iteration-count: infinite; ` 表示无限循环

**animation-play-state**

动画播放或暂停状态。

- paused - 暂停
- running - 播放

**animation-direction**

动画是否逆向播放。属性值：

- normal - 默认
- reverse - 反向播放动画
- alternate - 先正向然后反向播放动画
- alternate-reverse - 先反向然后正向播放动画

**animation-fill-mode**

动画时间之外的状态。属性值：

- forwards - 设置为动画结束时的状态
- backwards - 设置为动画开始时的状态

**定义动画**

```css
@keyframes 动画名称 {
    from { 开始位置 }
    to { 结束位置 }
}
/* 或者 */
@keyframes 动画名称 {
    0% { }
    XX% { }
    ......
    100% { }
}
```

**无缝滚动-动画实现：**

![无缝滚动](assets/无缝滚动.gif)

## transfrom-style: preserve-3d

`transform-style` 指定该元素内的所有子元素如何在3D空间中显示。

- flat - 默认值，在2D平面中呈现
- preserve-3d - 在3D平面中呈现

示例 - 3D旋转轮播图：

![3D旋转轮播图](assets/3D旋转轮播图.gif)

> 注意点： 
>
> transform属性写多个值时，注意多个值的先后顺序，这个例子中 `transform: rotateY(60deg) translateZ(200px);`  旋转rotateY和移动translateZ顺序颠倒则没有效果。
