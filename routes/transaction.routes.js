const express = require('express');
const router = express.Router();

// Import your transaction controller
const transactionController = require('./controllers/transactionController');

// Define your routes
router.get('/transactions', transactionController.getAllTransactions);
router.post('/transactions', transactionController.createTransaction);
router.put('/transactions/:transactionId', transactionController.updateTransaction);
router.delete('/transactions/:transactionId', transactionController.deleteTransaction);
router.get('/transactions/insights/last-five-years', transactionController.getLastFiveYearsData);


module.exports = router;
