# webpack基础配置参考

2019-05-31 19:30:29

## package.json
```json
{
  "name": "webpack-basic",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.32.2",
    "webpack-dev-server": "^3.4.1"
  },
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --env.NODE_ENV=development --open --port 5050 --hot"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

## webpack.config.js
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
  const devMode = env && env.NODE_ENV !== 'production'
  return {
    mode: devMode ? env.NODE_ENV : 'production',
    entry: path.join(__dirname, 'src/main.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[hash:8]-[name].css',
        chunkFilename: '[id].css',
      })
    ],
    module: {
      rules: [
        // .css
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        // .less
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 
            'less-loader'
          ]
        },
        // .scss
        { 
          test: /\.scss$/, 
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader', 
            'sass-loader'
          ] 
        },
        // fonts
        { 
          test: /\.(ttf|svg|eot|woff|woff2)$/, 
          use: 'file-loader?name=[hash:8]-[name].[ext]' 
        },
        // images
        {
          test: /\.(jpg|jpeg|png|gif|svg|bmp)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[hash:8]-[name].[ext]',
            }
          }
        },
        // es6+
        { 
          test: /\.js$/, 
          use: 'babel-loader', 
          exclude: /node_modules/ 
        },
        // html文件压缩loader
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,  // 启用HTML压缩
            }
          }
        },
      ]
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),  // 压缩 提取出来的css文件
        new TerserJSPlugin({}),  // 压缩js文件
      ],
    }
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
    }
  ],
]

const plugins = []

module.exports = {
  presets, 
  plugins,
}
```