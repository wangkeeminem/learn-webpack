// 指示webpack 干哪些活  入口 出口 plugin灯灯灯  需要用common.js(基于node平台)

const {resolve} = require('path')

module.exports = {
  // 配置入口与出口
  entry:'./src/index.js',
  output:{
    filename:'build.js',//输出文件名
    path:resolve(__dirname,"build")//当前目录的绝对路径+build
  },
  // 配置loader
  module:{
    rules:[
      // 匹配那些文件
      {
        test: /\.css$/,
        use:[
         //  use会先执行css-loader再执行style-loader 他是从右往左进行执行的
          'style-loader',//创建style标签，将js中的样式标签添加到header中
          'css-loader'//把css文件变成common.js 加载到js种
        ]
      },
      {
        test: /\.styl$/,
        use:[
         //  use会先执行css-loader再执行style-loader 他是从右往左进行执行的
          'style-loader',//创建style标签，将js中的样式标签添加到header中
          'css-loader',//把css文件变成common.js 加载到js种
          'stylus-loader'
        ]
      },
    ]
  },
  // plugin 
  plugins:[

  ],
  mode:'production'//或development
  // mode:'development',//或development
}