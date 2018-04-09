const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  output: { filename: './public/dist/bundle.js' },
  plugins: [new Dotenv({ path: '../.env' })],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
};
