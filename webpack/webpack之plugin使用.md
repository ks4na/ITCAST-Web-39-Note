# webpack 之 plugin 使用

- [实现 webpack 实时打包构建](#%e5%ae%9e%e7%8e%b0-webpack-%e5%ae%9e%e6%97%b6%e6%89%93%e5%8c%85%e6%9e%84%e5%bb%ba)
- [webpack-dev-server 常用命令](#webpack-dev-server-%e5%b8%b8%e7%94%a8%e5%91%bd%e4%bb%a4)
  - [指定启动时的根目录](#%e6%8c%87%e5%ae%9a%e5%90%af%e5%8a%a8%e6%97%b6%e7%9a%84%e6%a0%b9%e7%9b%ae%e5%bd%95)
  - [自动打开浏览器](#%e8%87%aa%e5%8a%a8%e6%89%93%e5%bc%80%e6%b5%8f%e8%a7%88%e5%99%a8)
  - [自定义端口号](#%e8%87%aa%e5%ae%9a%e4%b9%89%e7%ab%af%e5%8f%a3%e5%8f%b7)
  - [模块热替换](#%e6%a8%a1%e5%9d%97%e7%83%ad%e6%9b%bf%e6%8d%a2)
- [使用 html-webpack-plugin 插件](#%e4%bd%bf%e7%94%a8-html-webpack-plugin-%e6%8f%92%e4%bb%b6)
- [DefinePlugin 插件](#defineplugin-%e6%8f%92%e4%bb%b6)
  - [全局变量的定义和使用方式](#%e5%85%a8%e5%b1%80%e5%8f%98%e9%87%8f%e7%9a%84%e5%ae%9a%e4%b9%89%e5%92%8c%e4%bd%bf%e7%94%a8%e6%96%b9%e5%bc%8f)
  - [使用场景示例](#%e4%bd%bf%e7%94%a8%e5%9c%ba%e6%99%af%e7%a4%ba%e4%be%8b)
    - [ReactRouter 的 basename 根据实际部署在服务器的路径来调整](#reactrouter-%e7%9a%84-basename-%e6%a0%b9%e6%8d%ae%e5%ae%9e%e9%99%85%e9%83%a8%e7%bd%b2%e5%9c%a8%e6%9c%8d%e5%8a%a1%e5%99%a8%e7%9a%84%e8%b7%af%e5%be%84%e6%9d%a5%e8%b0%83%e6%95%b4)

## 实现 webpack 实时打包构建

每次修改代码之后都需要运行`webpack` 命令打包，比较麻烦，可以使用 `webpack-dev-server` 来实现代码的实时打包编译，当修改代码后，会自动进行打包构建。  
步骤：

1. 开发依赖中添加 `webpack` 和 `webpack-dev-server`：
   ```sh
   # webpack-dev-server 需要在开发依赖中安装 webpack
   yarn add webpack-dev-server webpack -D
   ```
2. 运行 `webpack-dev-server` 命令
   由于 `webpack-dev-server` 安装在开发依赖中，而不是全局安装，所以无法直接输入 `webpack-dev-server` 命令运行，可以在 `package.json` 的 `scripts` 中添加 `dev` 命令脚本：
   > ```js
   >   "dev": "webpack-dev-server"
   > ```
   >
   > 运行 `npm run dev` 命令后，提示信息如图：  
   > ![webpack-dev-server命令](media/webpack-dev-server.png)  
   > 构建成功了，但是浏览器打开 `http://localhost:8080/src/index.html` 却不会变化。  
   > 原因是**由于需要实时编译**，所以 `webpack-dev-server` 将打包的 `bundle.js` 放在了**内存中**的项目根目录。  
   > 调整 `index.html` 中的 `script` 标签 `src` 属性为根目录的 `/bundle.js` ，即可看到效果。

## webpack-dev-server 常用命令

### 指定启动时的根目录

webpack-dev-server 启动后打开的根目录是项目根目录，需要手动点击`src`才能进入`src` 下面的 `index.html` 页面中。  
在 `dev` 命令中添加 `--contentBase` 参数可以指定启动时的根目录：

```js
"dev": "webpack-dev-server --contentBase ./src"
```

### 自动打开浏览器

在 `dev` 命令中添加 `--open` 参数：

```js
"dev": "webpack-dev-server --open"
```

### 自定义端口号

在 `dev` 命令中添加 `--port` 参数：

```js
"dev": "webpack-dev-server --port 5050"
```

### 模块热替换

> 模块热替换应当用于开发环境，不适用于生产环境。
> 在 `dev` 命令中添加 `--hot` 参数：

```js
"dev": "webpack-dev-server --hot"
```

之后再修改代码，webpack 不是重新打包生成 `bundle.js` 文件，而是生成补丁文件，如下图：  
![webpack-dev-server热更新](media/webpack-dev-server热更新.png)

> 以上四个命令在 `webpack.config.js` 中配置方式如下：
>
> ```js
> module.exports = {
>   // ...
>   // 添加 devServer 属性
>   devServer: {
>     contentBase: "./src", // 指定启动时的根目录
>     open: true, // 自动打开浏览器
>     port: 5050, // 自定义端口号
>     hot: true // 模块热更新
>   }
>   // ...
> };
> ```
>
> 还需要开启模块热更替插件【`--hot` 命令不需要此设置，自动开启】：
>
> ```js
> const webpack = require("webpack");
> module.exports = {
>   // ...
>   // 添加 plugins 属性
>   plugins: [new webpack.HotModuleReplacementPlugin()]
>   // ...
> };
> ```
>
> 相比较来说，使用命令行参数的方式比使用配置文件的方式更方便一点。

## 使用 html-webpack-plugin 插件

使用 `--contentBase` 方式指定项目根目录的方式比较繁琐，需要指定启动目录，还需要修改 `index.html` 中 `script` 标签的 `src` 属性。  
所以推荐使用 `html-webpack-plugin` 插件配置启动页面。  
该插件可以在内存中生成一份指定文件的副本并且自动引用内存中的 `bundle.js` ，所以无需在 `index.html` 页面中手动引用 `dist/bundle.js`；  
并且在使用 `webpack` 命令打包时会将内存中的副本也同时打包到指定的目录（如 dist 目录）。  
步骤：

1. 安装
   开发依赖中添加 `html-webpack-plugin`：
   ```sh
   npm i html-webpack-plugin -D
   ```
2. 修改 `webpack.config.js` ：

   ```js
   const htmlWebpackPlugin = require("html-webpack-plugin");

   module.exports = {
     // ...
     // 在plugins属性中添加htmlWebpackPlugin插件
     plugins: [
       new htmlWebpackPlugin({
         template: path.join(__dirname, "src/index.html"), // 要生成到内存中的模板文件
         filename: "index.html" // 生成到内存中的文件的名称
       })
     ]
     // ...
   };
   ```

3. 运行命令
   修改 `dev`命令,去掉 `--contentBase` 然后运行 `dev` 命令。  
   打开的页面中自动添加了对 `bundle.js` 的引用。  
   ![html-webpack-plugin](media/html-webpack-plugin.png)

## DefinePlugin 插件

`DefinePlugin` 插件可以创建在**编译**时可以配置的全局常量。  
然后可以在代码中使用该全局常量来实现根据配置文件自动调整的功能。

### 全局变量的定义和使用方式

```js
const Webpack = require("webpack");

plugins: [
  new Webpack.DefinePlugin({
    VERSION: JSON.stringify("1.0.0")
  })
];
```

代码中直接可以使用该变量：

```js
const version = VERSION; // 使用 webpack 定义的变量
```

> 注意： 因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 `'"production"'`, 或者使用 `JSON.stringify('production')`。

### 使用场景示例

#### ReactRouter 的 basename 根据实际部署在服务器的路径来调整

如果不使用 webpack 全局变量来调整，那么需要同时调整代码和 webpack 的配置文件中的 `output.publicPath`，可能存在疏漏。  
可以考虑在 `package.json` 中添加自定义的配置字段 `config.publicPath` ，然后 webpack 配置文件中读取该值，设置到 `output.publicPath` ，并且暴露为一个全局变量 `BASENAME`，程序中直接获取它并设置给 `<Router>` 的 `basename` 属性。关键思路代码如下：

- package.json 文件：

  ```json
  {
    "config": {
      "basename": "/app-name"
    }
  }
  ```

- webpack.prod.js 文件：

  ```js
  // getServedPath() 和 ensureSlash() 方法从 create-react-app 脚手架源码中借鉴的，
  // 可以放到单独的文件 pathUtil.js 中
  const { getServedPath, ensureSlash } = require("./pathUtil.js");
  const Webpack = require("webpack");

  // 根据 package.json 中的 config.basename 字段设置 publicPath， 默认为 '/'
  const publicPath = getServedPath("./package.json");
  const basename = ensureSlash(publicPath, false); // basename 不需要后 '/'

  module.exports = {
    output: {
      publicPath: publicPath
    },
    plugins: [
      new Webpack.DefinePlugin({
        BASENAME: JSON.stringify(basename)
      })
    ]
  };
  ```

- pathUtil.js

  ```js
  const url = require("url");

  function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith("/");
    if (hasSlash && !needsSlash) {
      return inputPath.substr(0, inputPath.length - 1);
    } else if (!hasSlash && needsSlash) {
      return `${inputPath}/`;
    } else {
      return inputPath;
    }
  }

  const getPublicUrl = appPackageJson =>
    require(appPackageJson).config.publicPath;

  function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = publicUrl ? url.parse(publicUrl).pathname : "/";
    return ensureSlash(servedUrl, true);
  }
  module.exports = { getServedPath, ensureSlash };
  ```

- 程序中使用：

  ```jsx
  // 从 webpack 获取全局变量 BASENAME
  const basename = BASENAME;

  function App() {
    return (
      <>
        <BrowserRouter basename={basename}>...</BrowserRouter>
      </>
    );
  }
  ```

这样配置之后，当需要调整程序部署路径的时候，只需要调整 `package.json` 中的 `config.basename` 字段，然后重新打包，不再需要改动代码，避免出现疏漏。
