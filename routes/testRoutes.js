// Example routes

const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();

// Define routes
router.get('/', testController.getTest);
router.post('/', testController.createTest);

module.exports = router;
