var path = require('path')
var webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: { path: __dirname + '/public/dist', filename: 'bundle.js' },
  plugins: [new Dotenv({path: './.env'})],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
        // query: {
        //   presets: ['es2015', 'stage-0', 'react']
          // plugins: [['react-transform', {
          //   transforms: [{
          //     transform: 'react-transform-hmr',
          //     imports: ['react'],
          //     locals: ['module']
          //   }],
          // }]],
        // }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      }
    ]
  }
}