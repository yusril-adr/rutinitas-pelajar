const { resolve } = require('path');

const CONFIG = {
  PORT: process.env.PORT || 8080,
  PUB_PATH: resolve(__dirname, '../../'),
  DAYS_FORMAT: [
    'senin',
    'selasa',
    'rabu',
    'kamis',
    'jum\'at',
    'sabtu',
  ],
  SESSION_OPTIONS: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: process.env.MODE !== 'development',
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: true,
    },
  },
};

module.exports = CONFIG;
