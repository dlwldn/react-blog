const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/api/send/pw', controller.api.sendPw);
router.post('/api/add/board', controller.add.board);
router.post('/api/get/board', controller.get.board);
router.post('/api/get/board_cnt', controller.get.board_cnt);




module.exports = router;