const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = {
  resolve: {
    modules: ['./node_modules', './src'],
    alias: {
    },
    extensions: ['.js', '.json', '.css', '.less', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
        use: ['babel-loader?cacheDirectory=true'],
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, '../src'),
        use: { loader: 'awesome-typescript-loader' }
      },
      {
        test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/i,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      title: 'H5Editor',
      template: path.join(__dirname, '../src/assets/template.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vender: {
          name: 'vender',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
}

module.exports = common
