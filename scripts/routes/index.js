const express = require('express');
const { renderDefaultPage } = require('../util/response-helper');

const router = express.Router();

router.get('/', renderDefaultPage);
router.get('/tugas', renderDefaultPage);
router.get('/resolusi', renderDefaultPage);
router.get('/simpan', renderDefaultPage);
router.get('/pengaturan', renderDefaultPage);

module.exports = router;
