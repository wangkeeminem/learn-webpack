const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  webpack  = require('webpack')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,'build')
  },

  module:{
    rules:[
      //loader配置
      
    ]
  },
  plugins:[
//默认会创建空的html 自动引入打包输出的所有资源（js css）
//通过引入template可以引入自己定义的template
    
    new HtmlWebpackPlugin({
      //复制这个index文件 并自动引入打包的资源
      template:'./src/index.html',
    }),
    new webpack.DllReferencePlugin({
      manifest:resolve(__dirname,'dll/manifest.json')//将映射关系告诉webpack 即将所有引用第三方库的地方不用进行打包
    }),
    // 舍弃不打包目录后，通过add-asset-html-webpack-plugin自动在html中引入资源
    new AddAssetHtmlPlugin({
      filepath:resolve(__dirname,'dll/jquery.js'),
      outputPath: 'auto/'
    })
  ],
  
  mode:'production',
  // externals:{
  //   jquery:'jQuery'
  // }

}