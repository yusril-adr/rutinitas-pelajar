const express = require('express');
const passport = require('passport');
const { redirectTo } = require('../util/response-helper');

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google', passport.authenticate('google', { failureRedirect: '/masuk' }),
  redirectTo('/?masuk=true').exec);

module.exports = router;
