

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {resolve} = require('path')
//设置node.js环境变量

// process.env.NODE_ENV = "development"

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        {
          loader:'postcss-loader',//为css添加前缀的loader 需要放在预处理器的前面
          options:{
            postcssOptions:{
              plugins:[
                ['postcss-preset-env']
              ]
            }
            // plugins:()=>[
            //   //postcss的插件 用于帮助他加载浏览器(在package.json中的browerslist)中的兼容性样式
            //   require('postcss-preset-env')()
            // ]
          }
        }

        ]
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'assets/css/build.css'
    }),
    new CssMinimizerPlugin()
  ],
  mode:'production'
  // mode:'development'
}