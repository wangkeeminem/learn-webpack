const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { webpack } = require('webpack')

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
    })
  ],
  
  mode:'production'

}