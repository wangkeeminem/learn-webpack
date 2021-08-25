/* eslint-disable */ 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        test:/\.css$/,
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
          }
        ]
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            //预设兼容性处理
            [
              '@babel/preset-env',
              //按需加载相关兼容性
              {
                useBuiltIns:'usage',
                corejs:{version:3},//指定corejs版本
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
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'assets/css/index.css'
    }),
    new CssMinimizerPlugin(),
    
    // new ESLintWebpackPlugin({
    //   fix:true,
    //   // extensions:['js','json','coffee'],
    //   // exclude:['node_modules'],
    // })
  ],
  mode:'development'
}