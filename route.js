const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/api/send/pw', controller.api.sendPw);
router.post('/api/add/board', controller.add.board);

module.exports = router;