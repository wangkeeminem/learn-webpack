
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {resolve} = require('path')

process.env.NODE_ENV = 'production'

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'build.[contenthash:10].js',
    path:resolve(__dirname,'build'),
  },
  module:{
    rules:[
      {oneOf:[
        {
          test:/\.css$/,          
          use:[
            //css压缩处理
            {
              loader:MiniCssExtractPlugin.loader,
              options:{
                publicPath:'../../'
              }
            },
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
            ],
            cacheDirectory:true
          }
        },
        //图片
        {
          test:/\.(jpg|gif|png)$/,
          type:"asset",
          parser:{
            //传64的条件
            dataUrlCondition:{
              maxSize:8*1024
            },
            
          },
          generator:{
            filename:'assets/img/[name][hash:6][ext]',
            publicPath:'../../'
          },          
        },
        // 处理html中图片文件的引入
        {
          test:/\.html$/,
          loader:'html-loader',
          // options:{
          //   esModule:true,
          //   sources:false
          // }         
        },
        //其他文件处理
        {
          exclude:/\.(css|js|html|styl|png|gif|jpg)$/,
          generator:{
            filename:'assets/others/[name][ext]',
            publicPath:'../../'
          }
        }
      ]
    }
    ],
  },
  resolve: {
    roots: [resolve(__dirname, "build")],
  },
  plugins:[
    //配置css的位置 注意要和src中的结构一样
    new MiniCssExtractPlugin({
      filename:'assets/css/build.[contenthash:10].css'
    }),
    //css压缩
    new CssMinimizerPlugin(),
    //eslint配置
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
  devtool:'source-map'
}