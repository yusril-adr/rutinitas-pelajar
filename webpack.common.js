const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, 'src/scripts/index.js')],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // File loader for font
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      favicon: path.resolve('src', 'images', 'logo.png'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/'),
          to: path.resolve(__dirname, 'dist/images/'),
        },
      ],
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Rutinitas Pelajar',
      short_name: 'Rutinitas Pelajar',
      description: 'Membantu mengatur rutinitas kamu sebagai pelajar.',
      start_url: '/',
      display: 'standalone',
      background_color: '#43A047',
      theme_color: '#4CAF50',
      inject: true,
      fingerprints: true,
      ios: true,
      icons: [
        {
          src: path.resolve('src', 'images', 'logo.png'),
          sizes: [192, 256, 384, 512],
          ios: true,
          destination: 'images',
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src/scripts/service-worker.js',
      swDest: 'service-worker.js',
    }),
  ],
};
