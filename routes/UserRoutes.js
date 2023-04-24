const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/all', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

module.exports = router;
