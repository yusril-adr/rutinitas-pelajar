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
    name: 'pelajar_id',
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: process.env.MODE !== 'development',
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
      sameSite: true,
    },
  },
};

module.exports = CONFIG;
