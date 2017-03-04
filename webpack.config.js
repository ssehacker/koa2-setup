'use strict';

var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
let BannerPlugin = webpack.BannerPlugin;

//过滤node_modules中所有的模块
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  target: 'node',
  externals: nodeModules,
  context: __dirname,
  devtool: 'source-map',
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0']
      },
      include: [
        path.resolve(__dirname, 'src'),
      ]
    },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new BannerPlugin('require("source-map-support").install();', {raw: true, entryOnly: false})
  ]
};