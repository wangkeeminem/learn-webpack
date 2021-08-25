
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {resolve} = require('path')

process.env.NODE_ENV = 'production'


module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          //css压缩处理
          MiniCssExtractPlugin.loader,
          'css-loader',
          //css兼容处理
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  ['postcss-preset-env']
                ]
              }
            }
          }
        ]
      },
      {
        test:/\.styl$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  ['postcss-preset-env']
                ]
              }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            ['@babel/preset-env',//babel实现基本js兼容
            //corejs按需配置js兼容
            {
              useBuiltIns:'usage',
              corejs:{version:3},
              targets:{
                chrome:'60',
                firefox:'50',
                ie:'9',
                safari:'10',
                edge:'17'
              }
            }
            ]
          ]
        }
      },
      //图片
      {
        test:/\.(jpg|gif|png)$/,
        type:"asset",
        parser:{
          //传64的条件
          detaUrlCondition:{
            maxSize:8*1024
          }
        },
        generator:{
          filename:'assets/img/[name].[hash:6][ext]',
          publicPath:'./'
        }
      },
      //处理html中图片文件的引入
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      //其他文件处理
      {
        exclude:/\.(css|js|html|styl|png|gif|jpg)$/,
        generator:{
          filename:'assets/others/[name].[ext]',
          publicPath:'./'
        }
      }
      
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/build.css'
    }),
    //css压缩
    new CssMinimizerPlugin(),
    //es配置
    new ESLintWebpackPlugin({
       fix:true,
       extensions:['js','json','coffee'],
    }),
    //html模板引入以及压缩处理
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  mode:'production'
}