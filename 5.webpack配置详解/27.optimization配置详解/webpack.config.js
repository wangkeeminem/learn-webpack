const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve}  = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry:'./src/index.js',
  // entry:['./src/index.js','./src/add.js'],
  // entry:{main:'./src/index.js',add:'./src/add.js'},
  // entry:{main:['./src/index.js','./src/count.js'],add:'./src/add.js'},
  output:{
    filename:'[name].[contenthash:10].js',
    path:resolve(__dirname,'dist'),
    chunkFilename:'[name].[contenthash:10]_chunk.js',//文件名字 也可以写成目录文件格式

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
  mode:'production',
  //解析模块规则
  resolve:{
     //配置文件别名
    alias:{
      $css:resolve(__dirname,'src/assets/css')//当前配置文件下的src/assets/css目录
    },
    extensions:['.js','.json','.css'],//后缀名省略
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']//解析模块的规则  告诉目录
  },
  optimization:{
    splitChunks:{
      chunks:"all",
      //以下都是默认值 很少进行修改
      minSize:30 * 1024,//最小为多少kb 会进行分割提取
      // maxSize:0,//没有最大限制
      minChunks:1,//要提取的chunk最小要被引用1次
      maxAsyncRequests:5,//按需加载时 触发并行加载的最大文件数量为5  如果超过五个import()触发的加载模块，那就不会打包成chunk了
      maxInitialRequests:3,//入口js文件最大并行请求数量为3个
      automaticNameDelimiter:'~',//文件名称链接符
      cacheGroups:{//分割chunk的组
       //第三方库的文件 会被打包到vendors组的chunk中=》打包后的文件名：vendors~XXX.js
       //满足上面的公共规则 
       vendors:{
          test:/[\\/]node_modules[\\/]/,
          //打包的优先级
          priority:-10,
        },
        default:{
          //要提取的chunk最少被引用2次 覆盖上面的规则
          minChunks:2,
          //优先级较低
          priority:-20,
          //与提取提取的模块有同一个模块，会选择复用，不会重复打包
          reuseExistingChunk:true,
        }
      }
    },
    //将当前模块的记录其他模块的hash单独打包成一个文件 runtime文件
    runtimeChunk:{
      name:entrypoint=> `runtime-${entrypoint.name}`
    },
    minimize:true,
    minimizer:[
      //配置生产环境的压缩方案 ：针对js和css
      new TerserWebpackPlugin({       
        parallel:true,//开启多进程打包 可以赋予数字指定打包数量
        terserOptions: {
          
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
        //启用source-map  否则会被压缩掉      
      })
  ]
  }
}
