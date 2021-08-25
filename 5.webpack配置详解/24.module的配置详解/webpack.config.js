const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve}  = require('path')

module.exports = {
  entry:'./src/index.js',
  // entry:['./src/index.js','./src/add.js'],
  // entry:{main:'./src/index.js',add:'./src/add.js'},
  // entry:{main:['./src/index.js','./src/count.js'],add:'./src/add.js'},
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'dist'),
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.js$/,
        loader:'eslint-loader',
        exclude:/node_modules/,
        include:resolve(__dirname,'src'),//只检查某某位置的
        enforce:'pre'//优先执行'post'延后执行  不写的化  就是中间执行
      },
      {oneOf:[
        
      ]}
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}
