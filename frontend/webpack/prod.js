const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge')
const cssOptions = {
  modules: true,
  localIdentName: '[hash:base64:5]',
  importLoaders: 1,
}

const postcssOptions = {
  plugins: loader => [
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
  ],
}
const common = require('./common')

const build = {
  entry: {
    index: ['babel-polyfill', path.join(__dirname, '../src/main.tsx')],
    vendor: ['react', 'react-router-dom', 'react-dom']
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkHash:5].js',
    chunkFilename: "[name].[chunkHash:5].js",
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: [/node_modules/, /assets/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: cssOptions },
          { loader: 'postcss-loader', options: postcssOptions },
        ]
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: cssOptions },
          { loader: 'postcss-loader', options: postcssOptions },
          'less-loader',
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'],{root: path.join(__dirname, '../')}),
    new UglifyJSPlugin({
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash:5].css',
    }),
    new OptimizeCssAssetsPlugin()
  ],

}

module.exports = merge(common, build)
