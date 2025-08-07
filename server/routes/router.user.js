const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const UserController = require('../controllers/controller.user');

router.post('/register', upload.single('avatar'), UserController.register);

router.post('/login', UserController.login);

router.put('/update/:id', upload.single('avatar'), UserController.update);

router.delete('/delete/:id', UserController.remove);

module.exports = router;
