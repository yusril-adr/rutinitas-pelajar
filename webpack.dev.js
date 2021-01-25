const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    index: ['webpack-hot-middleware/client'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Dont use autoprefixer on dev mode
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/home.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'home.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/tugas.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'tugas.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/jadwal.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'jadwal.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/jadwal-verb.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'jadwal-verb.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/nilai.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'nilai.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/nilai-verb.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'nilai-verb.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/resolusi.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'resolusi.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/simpan.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'simpan.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/pengaturan.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'pengaturan.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
