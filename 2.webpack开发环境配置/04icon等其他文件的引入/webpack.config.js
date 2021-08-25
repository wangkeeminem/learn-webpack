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
        test:/\.css$/,
        use:['style-loader','css-loader']
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
  mode:'development'
}