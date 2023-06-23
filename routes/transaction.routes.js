const express = require('express');
const router = express.Router();

// Import your transaction controller
const transactionController = require('../controllers/transactionController');
const authMiddleWare = require('../middlewares/authMiddleWare');

// Define your routes
router.get('/', authMiddleWare, transactionController.getAllTransactionsData);
router.post('/', authMiddleWare, transactionController.createTransaction);
router.put(
	'/:transactionId',
	authMiddleWare,
	transactionController.updateTransaction
);
router.delete(
	'/:transactionId',
	authMiddleWare,
	transactionController.deleteTransaction
);

module.exports = router;
