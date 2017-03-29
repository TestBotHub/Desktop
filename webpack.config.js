const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/app/index'
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      //loaders: ['react-hot-loader', 'babel-loader'],
      //exclude: /node_modules/,
      //include: path.join(__dirname,'app'),
      query: {
          presets: ['es2015', 'react']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  output: {
    path: path.join(__dirname, 'src/app'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
