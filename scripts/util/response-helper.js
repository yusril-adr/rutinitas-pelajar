const { resolve } = require('path');

const renderDefaultPage = (request, response) => response.sendFile(resolve('dist/index.html'));

const redirectTo = (url = '/') => {
  const exec = (request, response) => response.redirect(url);

  return { exec };
};

const redirectToHome = (request, response) => response.redirect('/');

const sendAPIRespond = ({ respond, response }, { status = 'success' } = {}) => {
  let jsonResponse;

  if (typeof (respond) === 'string') jsonResponse = { status, message: respond };
  else jsonResponse = { status, result: respond };

  return response.send(jsonResponse);
};

const wrongEndpoint = (request, response) => {
  const message = 'Endpoint tidak ditemukan';

  return sendAPIRespond({ respond: message, response }, { status: 'error' });
};

const sendError = (message, response) => sendAPIRespond({ respond: message, response }, { status: 'error' });

const userNotAuthenticated = (response) => sendAPIRespond({
  respond: 'User belum masuk atau tidak terdaftar',
  response,
},
{ status: 'error' });

const checkUser = (request, response, next) => {
  if (!request.isAuthenticated()) return userNotAuthenticated(response);

  return next();
};

const ResponseHelper = {
  renderDefaultPage,
  redirectTo,
  redirectToHome,
  sendAPIRespond,
  wrongEndpoint,
  sendError,
  userNotAuthenticated,
  checkUser,
};

module.exports = ResponseHelper;
