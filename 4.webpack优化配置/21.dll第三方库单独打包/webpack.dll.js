const {resolve} = require('path')
const  webpack  = require('webpack')

//webpack更改打包配置 webpack --config webpack.dll.js 

//将第三方库单独打包
module.exports = {
  //打包jquery 并向外暴露一个包含hash值得名称
  entry:{
    //最终打包生成的name为jquery
    // 要打包的库为'jquery'
    jquery:['jquery']
  },
  output:{
    //
    filename:'[name].js',//name取得就是entry的jquery
    path:resolve(__dirname,'dll'),
    library:'[name]_[fullhash]',//打包库里面向外暴露出去的内容叫什么名字
  },
  //帮助创建一个manifest.json,提供映射关系（库与生成文件）
  plugins:[
    //
    new webpack.DllPlugin({
      name:'[name]_[fullhash]',//映射的库的暴露的名字
      path:resolve(__dirname,'dll/manifest.json'),//输出文件的路径

    })
  ],
  mode:'production'
}