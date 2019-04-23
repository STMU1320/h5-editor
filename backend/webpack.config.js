'use strict';
// https://www.yuque.com/easy-team/egg-react/config
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);
const cssOptions = {
  modules: true,
  localIdentName: '[local]-[hash:base64:5]',
  importLoaders: 1,
}

const postcssOptions = {
  plugins: loader => [
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
  ],
}
module.exports = {
  devtool: 'eval',
  entry: {
    home: 'app/web/page/home/index.tsx',
    h5: 'app/web/page/home/h5.tsx',
  },
  lib: ['react', 'react-dom'],
  loaders: {
    babel: {
      include: [resolve('app/web'), resolve('node_modules'), resolve('../common')]
    },
    less: {
      include: [resolve('app/web'), resolve('node_modules'), resolve('../common')],
      use: [
        // "style-loader",
        { loader: 'css-loader', options: cssOptions },
        { loader: 'postcss-loader', options: postcssOptions },
        'less-loader',
      ]
    },
    typescript: true
  },
  plugins: {
    imagemini: false
  },
  done() {
    console.log('---webpack compile finish---');
  }
};