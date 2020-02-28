# webpack 基础配置参考

- [created] 2019-05-31 19:30:29
- [updated] 2019-07-08 09:31:45
- [updated] 2019-12-12 14:12:02

## package.json

```json
{
  "name": "****",
  "version": "0.0.1",
  "description": "****",
  "main": "index.js",
  "author": "****",
  "license": "MIT",
  "scripts": {
    "dev": "webpack-dev-server --port 3000 --hot --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*": "prettier --check",
    "*.(js|jsx)": "eslint"
  },
  "config": {
    "publicPath": "/"
  },
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/preset-env": "^7.6.3",
    "@babel/preset-react": "^7.6.3",
    "babel-eslint": "^10.0.3",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.2.0",
    "eslint": "^6.5.1",
    "eslint-config-prettier": "^6.7.0",
    "eslint-plugin-prettier": "^3.1.1",
    "eslint-plugin-react": "^7.16.0",
    "file-loader": "^4.2.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "husky": "^3.0.9",
    "lint-staged": "^9.4.2",
    "mini-css-extract-plugin": "^0.8.0",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "prettier": "1.18.2",
    "redux-devtools-extension": "^2.13.8",
    "sass-loader": "^8.0.0",
    "style-loader": "^1.0.0",
    "url-loader": "^2.2.0",
    "webpack": "^4.41.2",
    "webpack-bundle-analyzer": "^3.6.0",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.2"
  },
  "dependencies": {
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/polyfill": "^7.6.0",
    "core-js": "3"
  }
}
```

## webpack.config.js(开发时配置文件)

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    // 如果不指定，默认为 '', 此时所有的引用路径都将是相对路径(例如：index.html 中引用的 bundle.js 的路径为：
    // src="bundle.js")，指定为 '/'之后，webpack 会将这些引用前面添加上 '/'。
    // 指定 publicPath 对于 BrowserRouter 模式非常重要， BrowserRouter 模式下不指定该属性，那么多层路由情况下
    // (如: localhost:3000/user/3/topics)刷新页面，这些引用路径都将是错误的(localhost:3000/user/3/bundle.js)
    publicPath: "/",
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js"
  },
  devServer: {
    host: "0.0.0.0", // 允许以非localhost方式访问，方便手机，其他机器访问本地项目
    historyApiFallback: {
      disableDotRule: true
    }, // browserRouter本地测试需要开启
    disableHostCheck: true, // 本地hosts劫持测试时需要开启

    // 关闭 WDS 在控制台的 log
    clientLogLevel: "none",
    // 启动 gzip 压缩
    compress: true
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    // 定义 webpack 全局变量，可从代码中获取该值
    new Webpack.DefinePlugin({
      __WEBPACK_ENV_BASENAME__: JSON.stringify("/")
    })
  ],
  module: {
    rules: [
      // css/scss (custom stylesheet)
      {
        test: /\.(css|sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // css modules, React requires
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]_[hash:8]" // custom className, format: filename__classname_hash:8
              }
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      },
      // css/scss (stylesheet from lib)
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: /node_modules/
      },
      // img
      {
        test: /\.(jpg|jpeg|gif|bmp|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5120, // size less than 5k will use base64_encode
            name: "[name]_[hash:8].[ext]"
          }
        },
        exclude: /src[\\/]fonts/
      },
      // fonts
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[hash:4].[ext]"
          }
        },
        exclude: /src[\\/]imgs/
      },
      // es6+
      {
        test: /\.jsx?/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      // es6+ (transform es6+ files in directory node_modules/** )
      {
        test: /\.jsx?/,
        use: "babel-loader",
        include: [/node_modules[\\/]react-intl/]
      }
    ]
  }
};
```

## webpack.prod.js(发布时配置文件)

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getServedPath, ensureSlash } = require("./pathUtil.js");
const Webpack = require("webpack");

// 根据 package.json 中的 config.basename 字段设置 publicPath， 默认为 '/'
const publicPath = getServedPath("./package.json");
const basename = ensureSlash(publicPath, false); // basename 后面不需要 '/'

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    // 如果不指定，默认为 '', 此时所有的引用路径都将是相对路径(例如：index.html 中引用的 bundle.js 的路径为：
    // src="bundle.js")，指定为 '/'之后，webpack 会将这些引用前面添加上 '/'。
    // 指定 publicPath 对于 BrowserRouter 模式非常重要， BrowserRouter 模式下不指定该属性，那么多层路由情况下
    // (如: localhost:3000/user/3/topics)刷新页面，这些引用路径都将是错误的(localhost:3000/user/3/bundle.js)
    publicPath,
    path: path.join(__dirname, "./dist"),
    filename: "js/bundle.js",
    chunkFilename: "js/[name].bundle.js" // 输出到dist文件的chunk文件的名称
  },
  devtool: "source-map",
  optimization: {
    // 指定js/css压缩器
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // 压缩 提取出来的css文件
      new TerserJSPlugin({
        parallel: true, // 多核运行
        sourceMap: true // 允许输出 sourcemap
      }) // 压缩js文件
    ],
    // 分离第三方包
    splitChunks: {
      chunks: "all"
      // cacheGroups: {
      //   // 自定义一个 commons 组，分离 react|react-dom|react-router-dom 包为 react-dom-router.bundle.js
      //   // 注意设置 priority 高于 vendors 组才能生成该文件，且此时 vendors 组不再包含 react,react-dom,react-router-dom
      //   commons: {
      //     test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
      //     name: 'react-dom-router',
      //     chunks: 'all',
      //     priority: 10
      //   }
      // }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static" // 设置生成方式为 html文件
    }), // bundle分析插件
    new CleanWebpackPlugin(), // 清理dist文件夹
    // 定义 webpack 全局变量，可从代码中获取该值
    new Webpack.DefinePlugin({
      __WEBPACK_ENV_BASENAME__: JSON.stringify(basename)
    })
  ],
  module: {
    rules: [
      // css/scss (custom stylesheet)
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader: "css-loader",
            options: {
              // css modules, React requires
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]_[hash:8]" // custom className, format: filename__classname_hash:8
              }
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      },
      // css/scss (stylesheet from lib)
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader",
          "sass-loader"
        ],
        include: /node_modules/
      },
      // img
      {
        test: /\.(jpg|jpeg|gif|bmp|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5120, // size less than 5k will use base64_encode
            context: "src",
            name: "[path][name]_[hash:8].[ext]"
          }
        },
        exclude: /src[\\/]fonts/
      },
      // fonts
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name]_[hash:4].[ext]"
          }
        },
        exclude: /src[\\/]imgs/
      },
      // es6+
      {
        test: /\.jsx?/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      // es6+ (transform es6+ files in directory node_modules/** )
      {
        test: /\.jsx?/,
        use: "babel-loader",
        include: [/node_modules[\\/]react-intl/]
      },
      // html files
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true // 启用html压缩
          }
        }
      }
    ]
  }
};

// 其中需要的 pathUtil.js 在同目录下，用于获取 package.json 中 config.publicPath 字段
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

## babel.config.js

```js
const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: {
        version: 3,
        proposal: true
      }
    }
  ],
  "@babel/preset-react"
];

const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = {
  presets,
  plugins
};
```
