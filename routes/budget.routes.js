const express = require('express');
const router = express.Router();

//Import Budget Controller
const budgetController = require('../controllers/budgetController');
const authMiddleWare = require('../middlewares/authMiddleWare');

//Define your routes
router.get('/', authMiddleWare, budgetController.getAllBudgetData);
router.post('/', authMiddleWare, budgetController.addBudgetData);
router.put('/:budgetId', authMiddleWare, budgetController.updateBudgetData);
router.delete(
	'/:categoryId',
	authMiddleWare,
	budgetController.deleteBudgetData
);

module.exports = router;
