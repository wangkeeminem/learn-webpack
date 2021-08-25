const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,"build")
  },
  module:{
    rules:[
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.styl$/,
        use:['style-loader','css-loader','stylus-loader']
      },
      {
        //除了html和js css资源外的东东
        exclude:/\.(css|js|html)$/,
        generator:{
          filename:'assets/others/[name].[ext]',//文件命名 
          publicPath:'./'//打包后资源相对于输出目录的路径
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development',
  //需要安装webpack-dev-server
  //启动命令npx webpack serve
  devServer:{
    //之前设置的输出目录 只在内存中打包 不会有任何输出
    static:resolve(__dirname,'build'),
    //启动gzip压缩
    compress:true,
    hot:true,
    //启动端口号
    port:3000,
    open:true
    
  }
}