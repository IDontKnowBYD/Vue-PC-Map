const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/docs/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebPackPlugin({
      filenmame: '../index_prod.html',
      template: './index.ejs',
      inject: false
    })
  ]
})