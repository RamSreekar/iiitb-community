const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/all', userController.getUsers);

router.get('/:userId', userController.getUserById);

module.exports = router;
