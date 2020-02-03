const fs = require('fs');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, '../../certs/localhost-key.pem'),
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, '../../certs/localhost.pem'),
      ),
    },
    overlay: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 8080,
    open: process.platform === 'linux' ? 'google-chrome' : 'Google Chrome',
  },
});
