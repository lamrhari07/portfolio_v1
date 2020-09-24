const merge = require('webpack-merge');
const path = require('path');
const common = require('../webpack.common.js');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.bundle.js',
    publicPath: '/'
  },
};

module.exports = merge.merge(common, config);