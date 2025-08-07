const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/controller.chat');

router.post('/room', ChatController.createRoom);
router.post('/message', ChatController.sendMessage);
router.get('/messages/:roomId', ChatController.getMessages);

module.exports = router;
