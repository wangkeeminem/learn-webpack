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
    // publicPath:'/',
    chunkFilename:'[name]_chunk.js',
    library:{
      name:'[name]',
      type:'umd'
    },
    libraryTarget:'window'
  },
  module:{
    
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}
