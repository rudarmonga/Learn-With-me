const express = require('express');
const router = express.Router();
const PostController = require('../controllers/controller.post');

router.post('/', PostController.create);
router.get('/', PostController.getAll);
router.get('/:id', PostController.getOne);
router.post('/:id/like', PostController.like);
router.post('/:id/comment', PostController.comment);

module.exports = router;