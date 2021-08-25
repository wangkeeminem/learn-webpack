
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports= {
  entry:['./src/index.js','./src/index.html'],
  output:{
    filename:'build.js',
    path:resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.styl$/,
        use:['style-loader','css-loader','stylus-loader']
      },
      {
        test:/\.(png|jpg|gif)$/,
        type:'asset',//zhuyi
        parser:{
          dataUrlCondition:{
            maxSize:8*1024
          }
        },
        generator:{
          filename:'assets/img/[name].[hash:6][ext]',
          publicPath:'./'
        }
      },
      {//img引入图片配置 webpack5版本
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(css|html|js|png|jpg|gif)$/,
        generator:{
          filename:'assets/others/[name].[hash:6][ext]',
          publicPath:'./'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new HotModuleReplacementPlugin({})
  ],
  mode:'development',

  devServer:{
    static:resolve(__dirname,'dist'),
    compress:true,
    hot:true,
    port:3000,
    open:true,
  },
  devtool:'source-map'
  // target:'web'
}