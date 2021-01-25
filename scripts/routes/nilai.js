const express = require('express');
const { renderDefaultPage } = require('../util/response-helper');

const router = express.Router();

router.get('/', renderDefaultPage);
router.get('/:semester', renderDefaultPage);

module.exports = router;
