const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.dev');

const app = express();
const compiler = webpack(webpackConfig);

const DEVMODE = {
  init() {
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }));

    app.use(webpackHotMiddleware(compiler));
  },
};

module.exports = DEVMODE;
