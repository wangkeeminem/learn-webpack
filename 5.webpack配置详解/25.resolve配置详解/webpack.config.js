const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve}  = require('path')

module.exports = {
  entry:'./src/index.js',
  // entry:['./src/index.js','./src/add.js'],
  // entry:{main:'./src/index.js',add:'./src/add.js'},
  // entry:{main:['./src/index.js','./src/count.js'],add:'./src/add.js'},
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'dist'),
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development',
  //解析模块规则
  resolve:{
     //配置文件别名
    alias:{
      $css:resolve(__dirname,'src/assets/css')//当前配置文件下的src/assets/css目录
    },
    extensions:['.js','.json','.css'],//后缀名省略
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']//解析模块的规则  告诉目录
  }
}
