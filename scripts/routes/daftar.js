const express = require('express');
const passport = require('passport');
const { User } = require('../data/model');
const { renderDefaultPage, sendAPIRespond, sendError } = require('../util/response-helper');

const router = express.Router();

router.use((request, response, next) => {
  if (request.isAuthenticated()) return response.redirect('/?masuk');

  return next();
});

router.route('/')
  .get(renderDefaultPage)
  .post(async (request, response) => {
    const { username, password, display_name } = request.body;
    User.register({ username }, password, async (error, user) => {
      if (error) {
        return sendError(error.message, response);
      }

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $set: { display_name },
      });

      return passport.authenticate('local')(request, response, () => sendAPIRespond({ respond: updatedUser, response }));
    });
  });

module.exports = router;
