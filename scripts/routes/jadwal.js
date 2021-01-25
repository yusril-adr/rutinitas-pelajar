const { resolve } = require('path');
const express = require('express');
const { PUB_PATH } = require('../global/config');
const { renderDefaultPage } = require('../util/response-helper');
const { isItDay } = require('../util/days-helper');

const router = express.Router();

router.get('/', renderDefaultPage);
router.get('/:hari', (request, response) => {
  if (isItDay(request.params.hari)) return response.sendFile(resolve(PUB_PATH, 'dist/index.html'));

  return response.redirect('/jadwal');
});

module.exports = router;
