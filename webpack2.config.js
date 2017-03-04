/**
 * Created by ssehacker on 2017/3/4.
 */
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var BannerPlugin = webpack.BannerPlugin;

//过滤node_modules中所有的模块
var nodeExternals = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeExternals[mod] = 'commonjs ' + mod;
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
  devtool: 'source-map',
  externals: nodeExternals,
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        },
        include: [
          path.resolve(__dirname, 'src'),
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ]
};