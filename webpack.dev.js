const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: common.externals.paths.dist,
    open: true,
    port: 3000,
    overlay: {
      warnings: true,
      errors: true
    }
  }
});