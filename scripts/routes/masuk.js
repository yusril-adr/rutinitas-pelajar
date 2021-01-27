const express = require('express');
const passport = require('passport');
const { User } = require('../data/model');
const { sendAPIRespond, sendError } = require('../util/response-helper');

const router = express.Router();

router.use((request, response, next) => {
  if (request.isAuthenticated()) return response.redirect('/?masuk');

  return next();
});

router.post(('/'), async (request, response) => {
  const { username, password } = request.body;
  const user = new User({ username, password });

  request.login(user, (error) => {
    if (error) {
      return sendError(error.message, response);
    }

    return passport.authenticate('local')(request, response, () => sendAPIRespond({ respond: user, response }));
  });
});

module.exports = router;
