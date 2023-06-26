const { default: errors } = require('../errors');
const Budget = require('../models/Budgetmodel');

// Handler for GET /budget
async function getAllBudgetData(req, res) {
	try {
		const userId = req.userId;

		const budgets = await Budget.find({ userId });

		const budgetData = budgets.map((budget) => ({
			categoryId: budget.categoryId,
			userId: budget.userId,
			budget: budget.budget
		}));

		res.status(200).json({ message: 'Successful Fetch', budgetData });
	} catch (error) {
		res.status(400).json({
			message: 'Cant fetch budgets'
		});
	}
}

// Handler for POST /budget

async function addBudgetData(req, res) {
	try {
		const userId = req.userId;
		const { categoryId, budget } = req.body;

		const existingBudget = await Budget.findOne({ userId, categoryId });
		if (existingBudget) {
			existingBudget.budget = budget;
			await existingBudget.save();
			return res.status(200).json({ budgetData: existingBudget });
		}

		const budgetData = await Budget.create({
			userId,
			categoryId,
			budget
		});
		return res.status(200).json({ budgetData });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'cant add budget'
		});
	}
}

// Handler for PUT /budget/:budgetId

async function updateBudgetData(req, res) {
	try {
		const budgetId = req.params.budgetId;
		const { budget, amountSpent } = req.body;
		const budgetData = await Budget.findByIdAndUpdate(
			budgetId,
			{ budget, amountSpent },
			{ new: true }
		);
		res.status(200).json({ budgetData });
	} catch (error) {
		res.status(errors.budgetUpdateError.code).json({
			message: errors.budgetUpdateError.message
		});
	}
}

// Handler for DELETE /budget/:budgetId

async function deleteBudgetData(req, res) {
	try {
		const userId = req.userId;
		const categoryId = req.params.categoryId;
		await Budget.deleteOne({ userId, categoryId });
		return res.status(200).json({ message: 'Successfully deleted' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'cant delete budget'
		});
	}
}

module.exports = {
	getAllBudgetData,
	addBudgetData,
	updateBudgetData,
	deleteBudgetData
};
