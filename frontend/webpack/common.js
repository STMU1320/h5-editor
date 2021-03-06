const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const theme = require('../src/theme/lessToJs')()
const postcssOptions = {
  plugins: loader => [
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
  ],
}

const common = {
  resolve: {
    modules: ['./node_modules', './src'],
    alias: {
      '@c': '../../common'
    },
    extensions: ['.js', '.json', '.css', '.less', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.join(__dirname, '../src/assets'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&-autoprefixer',
          { loader: 'postcss-loader', options: postcssOptions },
          { loader: 'less-loader', options: {
            javascriptEnabled: true,
            modifyVars: theme
          } }
        ],
        include: path.resolve('node_modules')
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../../common')],
        use: ['babel-loader?cacheDirectory=true'],
      },
      {
        test: /\.tsx?$/i,
        include: [path.join(__dirname, '../src'), path.join(__dirname, '../../common'), path.join(__dirname, '../node_modules')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            }
          },
          'awesome-typescript-loader'
        ]
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
        test: /\.(eot|woff|ttf|woff2|svg)(\?[=a-z0-9]+)?$/i,
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
