# webpack拓展之压缩提取

- [html文件压缩](#html文件压缩)
- [提取CSS到单独文件](#提取css到单独文件)
  - [CSS文件压缩](#css文件压缩)
  
## html文件压缩
1. 添加 `html-loader` ：
   ```sh
   yarn add -D html-loader
   ```
2. 添加匹配规则：  
   ```js
   {
     test: /\.html$/,
     use: {
       loader: 'html-loader',
       options: {
         minimize: true,  // 启用html压缩
       }
     }
   }
   ```  

> 从上面的loader规则配置可以看出，loader规则配置时如果需要传入参数，可以给 `use` 属性传入一个包含 `loader`，`options` 属性的对象，  
> 据此，之前配置过的 `url-loader` 可以重写为如下：  

```js
use: {
  loader: 'url-loader',
  options: {
    limit: 20480,  // 限制base64转码的临界值
    name: '[hash:8]-[name].[ext]',  // 指定输出文件的命名格式
  }
}
```

## 提取CSS到单独文件
1. 安装 `mini-css-extract-plugin` :
   ```sh
   yarn add -D mini-css-extract-plugin
   ```
2. 添加到 `plugins` 节点中：  
   ```js
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')

   // ...
   plugins: [
     new MiniCssExtractPlugin({
       filename: '[hash:8]-[name].css',
       chunkFilename: '[id].css',
     }),
   ],
   // ...

   ```

3. 将 `style-loader` 替换成 `MiniCssExtractPlugin.loader` ：  
   ```js
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
   ```

### CSS文件压缩
webpack打包时提取出来的CSS文件不会被压缩，需要手动安装 `optimize-css-assets-webpack-plugin` 进行压缩：  
1. 安装 `optimize-css-assets-webpack-plugin` ：  
   ```sh
   yarn add -D optimize-css-assets-webpack-plugin
   ```
2. 向 `webpack.config.js` 中添加 `optimization` 属性， 指定 `minimizer` 来覆盖默认的压缩器：  
   ```js
   const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
   const TerserJSPlugin = require('terser-webpack-plugin')  // webpack默认依赖的压缩器，无需手动安装，只能压缩js文件

   // ...
   optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),  // 压缩 提取出来的css文件
        new TerserJSPlugin({}),  // 压缩js文件
      ],
    }
    // ...

   ```
   > 注意： 由于指定的 `minimizer` 会覆盖默认的压缩器，所以还需要重新指明 JS压缩器为 `TerserJSPlugin` ，否则js文件将不会被压缩。