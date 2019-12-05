# webpack基础配置参考

- [created] 2019-05-31 19:30:29  
- [updated] 2019-07-08 09:31:45  

## package.json(包含发布时需要的依赖包)  

```json  
{
  "name": "webpack-basic",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build:prod": "webpack --config webpack.prod.js --env.NODE_ENV=production",
    "build:dev": "webpack --env.NODE_ENV=development",
    "dev": "webpack-dev-server --port 5050 --hot --open --env.NODE_ENV=development"
  },
  "devDependencies": {
    "@babel/core": "^7.5.0",
    "@babel/plugin-proposal-class-properties": "^7.5.0",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/preset-env": "^7.5.0",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.0.0",
    "file-loader": "^4.0.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^2.0.1",
    "webpack": "^4.35.2",
    "webpack-bundle-analyzer": "^3.3.2",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

## webpack.config.js(开发时配置文件)

```js  
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      // css/scss
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // fonts
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        },
        exclude: /src\\imgs/  // 排除src/imgs目录
      },
      // imgs
      {
        test: /\.(gif|png|jpg|jpeg|bmp|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: '[name]__[hash:8].[ext]'
          }
        },
        exclude: /src\\fonts/  // 排除src/fonts目录
      },
      // es6+
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```  

## webpack.prod.js(发布时配置文件)

```js   
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin') 

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].bundle.js' // 输出到dist文件的chunk文件的名称
  },
  optimization: {
    // 指定js/css压缩器
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),  // 压缩 提取出来的css文件
      new TerserJSPlugin({
        parallel: true,   // 多核运行
        sourceMap: true  // 允许输出 sourcemap 
      }),  // 压缩js文件
    ],
    // 分离第三方包
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static' // 设置生成方式为 html文件
    }), // bundle分析插件
    new CleanWebpackPlugin(), // 清理dist文件夹
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      // css/scss styles
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      // imgs
      {
        test: /\.(jpg|jpeg|bmp|gif|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120, // < 5k 进行base64转码
            context: 'src',
            name: '[path][name]__[hash:8].[ext]'
          }
        },
        exclude: /src\\fonts/
      },
      // fonts
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            // context: 'src',
            // outputPath: (url, resourcePath, context) => {
            //   if (/node_modules/.test(resourcePath)) {
            //     return `fonts/${url}`
            //   }
            //   const relativePath = path.relative(context, resourcePath)
            //   const relativeDir = path.dirname(relativePath)
            //   return `${relativeDir}/${url}`
            // },
            // name: '[name]__[hash:8].[ext]'
            name: 'fonts/[name]__[hash:8].[ext]'
          }
        },
        exclude: /src\\imgs/
      },
      // es 6+
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // html files
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true // 启用html压缩
          }
        }
      }
    ]
  }
}

```

## babel.config.js

```js   
const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 2
    }
  ]
]

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import'  // 支持动态导入语法 import()
]

module.exports = {
  presets,
  plugins
}
```