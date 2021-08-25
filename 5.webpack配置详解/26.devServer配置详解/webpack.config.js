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
  },
  devServer:{
    contentBase:resolve(__dirname,'build'),
    watchContentBase:true,//监视文件 一旦变化 就刷新 不用保存了
    watchOptions:{
      ignored:/node_modules/,//忽略监视文件
    },
    compress:true,
    port:3000,
    host:'localhost',
    open:true,
    hot:true,
    clientLogLevel:'none',//关闭服务器启动日志信息
    quiet:true,//除了基本启动信息 其他都不显示
    overlay:false,//关闭全屏报错提示
    //解决跨域问题
    proxy:{
      '/api':{
        target:'http://localhost:5000',//一旦有api请求 转发为localhost:5000代理服务器进行请求 
        pathRewrite:{
          '^/api':''//并将api去掉
        }
      }
    }
  }
}
