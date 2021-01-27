/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { User } = require('./scripts/data/model');
const CONFIG = require('./scripts/global/config');
const db = require('./scripts/data/mongodb-connection');
const indexRoute = require('./scripts/routes/index');
const jadwalRoute = require('./scripts/routes/jadwal');
const nilaiRoute = require('./scripts/routes/nilai');
const masukRoute = require('./scripts/routes/masuk');
const daftarRoute = require('./scripts/routes/daftar');
const apiRoute = require('./scripts/routes/api');
const { redirectToHome } = require('./scripts/util/response-helper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.MODE === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.dev');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));
}

// Cookies and session
app.use(session(CONFIG.SESSION_OPTIONS));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Database Connected.');

  // Avoid to access directly to index.html
  // app.get('/index.html', redirectToHome);

  app.use(express.static(path.resolve(__dirname, 'dist')));

  app.use('/', indexRoute);
  app.use('/jadwal', jadwalRoute);
  app.use('/nilai', nilaiRoute);
  app.use('/masuk', masukRoute);
  app.use('/daftar', daftarRoute);
  app.use('/api', apiRoute);

  app.get('/keluar', (request, response) => {
    request.logOut();
    return response.redirect('/?keluar');
  });

  app.get('/:resource', redirectToHome);

  app.listen(CONFIG.PORT, () => {
    console.log(`App listening to http://127.0.0.1:${CONFIG.PORT} || http://localhost:${CONFIG.PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
});
