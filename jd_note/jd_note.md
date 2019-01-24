# 京东练习项目笔记

## 添加网站favicon

```html	
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```

emmet快捷输入：`link:favicon`

## 网站优化三大标签

SEO： Search Engine Optimization， 搜索引擎优化。

三大标签： title、description、keywords。

### title

title具有不可替代性，是我们的内页第一个重要标签，是搜索引擎了解网页的入口，和对网页主题归属的最佳判断点。（最好少于28个中文）

> 建议格式：
>
> > 网站名(产品名) - 网站介绍
>
> 例子：
>
> > 小米商城 - 小米5s、红米Note 4、小米MIX、小米笔记本官方网站
> 
> > 京东(JD.COM)-综合网购首选-正品低价、品质保障、配送及时、轻松购物！

### description

简要说明我们网站的主要做什么的，即网站的总体业务和主题概括。（最好少于120个字符）

小米网：

```html
<meta name="description" content="小米商城直营小米公司旗下所有产品，囊括小米手机系列小米MIX、小米Note 2，红米手机系列红米Note 4、红米4，智能硬件，配件及小米生活周边，同时提供小米客户服务及售后支持。" />
```

### keywords

页面关键词，是搜索引擎关注点之一。(6-8个关键词左右)

小米网：

```html
<meta name="keywords" content="小米,小米6,红米Note4,小米MIX,小米商城" />
```

京东网：

```html
<meta name="Keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东" />
```

## 网站logo写法

在a标签外面再包裹一层h1标签，增加权重。