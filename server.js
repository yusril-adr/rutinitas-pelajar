/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./scripts/data/model');
const CONFIG = require('./scripts/global/config');
const ModelHelper = require('./scripts/util/model-helper');
const db = require('./scripts/data/mongodb-connection');
const indexRoute = require('./scripts/routes/index');
const jadwalRoute = require('./scripts/routes/jadwal');
const nilaiRoute = require('./scripts/routes/nilai');
const masukRoute = require('./scripts/routes/masuk');
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google Oauth
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `http://localhost:${CONFIG.PORT}/masuk/google`,
}, (accessToken, refreshToken, profile, cb) => {
  const { _json: user } = profile;

  ModelHelper.findOrCreateWithCallback({
    filter: {
      google_id: user.sub,
    },
    data: {
      username: user.email,
      display_name: user.given_name,
      google_id: user.sub,
    },
  }, {
    Model: User,
    callback: cb,
  });
}));

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Database Connected.');

  // Avoid to access directly to index.html
  app.get('/index.html', redirectToHome);

  app.use(express.static(path.resolve(__dirname, 'dist')));

  app.use('/', indexRoute);
  app.use('/jadwal', jadwalRoute);
  app.use('/nilai', nilaiRoute);
  app.use('/masuk', masukRoute);
  app.use('/api', apiRoute);

  app.get('/keluar', (request, response) => {
    request.logOut();
    return response.redirect('/?keluar=true');
  });

  app.get('/:resource', redirectToHome);

  app.listen(CONFIG.PORT, () => {
    console.log(`App listening to http://127.0.0.1:${CONFIG.PORT} || http://localhost:${CONFIG.PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
});
