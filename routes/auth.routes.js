const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Sign up
router.post('/signup', authController.signup);

//Log in
router.post('/login', authController.login);

module.exports = router;
