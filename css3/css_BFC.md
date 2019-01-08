# CSS - BFC

## BFC（块级格式化上下文）

BFC(block formatting context)： 块级格式化上下文。

是一个独立的渲染区域，其内部元素的布局与外部毫不相关。

## 哪些元素会具有BFC的条件

display 属性为 block, list-item, table 的元素，会产生BFC。

## 如何触发BFC

块级元素有如下条件之一，即可触发BFC：

- float属性不为none
- position为absolute或者fixed
- display为inline-block, table-cell, table-caption, flex, inline-flex
- overflow不为visible

## BFC的特性和应用

- 计算BFC高度时，会检测浮动的盒子的高度。

  用途： 清除元素内部浮动

- 同一个BFC中的两个相邻盒子垂直方向的margin会合并