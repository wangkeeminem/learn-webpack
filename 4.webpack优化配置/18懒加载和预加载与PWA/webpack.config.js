
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const {resolve} = require('path')

process.env.NODE_ENV = 'production'

module.exports = {
  entry:'./src/index.js', 
  output:{
    filename:'[name].[contenthash:10].js',
    path:resolve(__dirname,'build'),
  },

  plugins:[

    //html模板引入以及压缩处理
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      // 快速启动service、删除旧的
      clientsClaim:true,
      skipWaiting:true
    })
  ],
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production',
  devServer:{
    //之前设置的输出目录 只在内存中打包 不会有任何输出
    static:resolve(__dirname,'build'),
    //启动gzip压缩
    compress:true,
    //热更新
    hot:true,
    //启动端口号
    port:3000,
    //自动打开浏览器
    open:true
  },
  // devtool:'source-map'
}