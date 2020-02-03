const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, '../../src/index.js')],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../../src/components'),
      pages: path.resolve(__dirname, '../../src/pages'),
      services: path.resolve(__dirname, '../../src/services'),
      styles: path.resolve(__dirname, '../../src/styles'),
      utils: path.resolve(__dirname, '../../src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    maxAssetSize: 300000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Project Title',
      template: path.resolve(__dirname, '../../public/index.html'),
      filename: path.resolve(__dirname, '../../dist/index.html'),
    }),
  ],
};
