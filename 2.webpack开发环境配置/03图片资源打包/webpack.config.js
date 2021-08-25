
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.styl$/,
        use:[
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test:/\.(jpg|png|gif)$/,
        type:"asset",
        parser:{
          //转64的条件
          dataUrlCondition:{
            maxSize:8*1024
          }
        },
        generator:{
          filename:'img/[name].[hash:6][ext]',//文件命名 
          publicPath:'./'//打包后资源相对于输出目录的路径
        }
        // use:[
        //   {
        //     loader:'url-loader',
        //     options:{
        //       limit:8 * 1024,//小于8kb 以base64进行处理 有点 服务器压力down 缺点 文件体积更大
        //       esModule:false
        //     }
        //   }
        // ]      
      },
      {//专门负责引入img文件
        test:/\.html$/,
        loader:'html-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'production'
}
