const { default: errors } = require('../errors');
const Budget = require('../models/Budgetmodel');

// Handler for GET /budget
async function getAllBudgetData(req, res) {
    try{
        const userId = req.userId;
        
        const budgets = await Budget.find({userId});
       
        const budgetData = budgets.map((budget) => ({
            categoryId: budget.categoryId,
            userId: budget.userId,
            budget: budget.budget,
            
        }));
       
        const categories = [
			{ id: 0, value: 'Food', type: 'expense' },
			{ id: 1, value: 'Business', type: 'income' },
			{ id: 2, value: 'Clothes', type: 'expense' },
			{ id: 3, value: 'Education', type: 'expense' },
			{ id: 4, value: 'Entertainment', type: 'expense' },
			{ id: 5, value: 'Health', type: 'expense' },
			{ id: 6, value: 'Gifts', type: 'expense' },
			{ id: 7, value: 'Investments', type: 'income' },
			{ id: 8, value: 'Other', type: 'expense' },
			{ id: 9, value: 'Salary', type: 'income' },
			{ id: 10, value: 'Other', type: 'income' }
		];

        const budgetDataWithCategory = budgetData.map((budget) => {
            
            const category = categories.find((category) => category.id === budget.categoryId);
            return {
                ...budget,
                category: category.id,
            };
        });

    res.status(200).json({budgetData, budgetDataWithCategory});
    } catch (error) {

        res.status(errors.budgetFetchError.code).json({
            message: errors.budgetFetchError.message
        });

    }
}

// Handler for POST /budget

async function addBudgetData(req, res) {

    try {
        const userId = req.userId;
        const categoryId = req.categoryId;
        const {budget, amountSpent} = req.body;
        const budgetData = await Budget.create({userId, categoryId, budget, amountSpent});
        res.status(200).json({budgetData});
    } catch (error) {
        res.status(errors.budgetAddError.code).json({
            message: errors.budgetAddError.message
        });
    }
}

// Handler for PUT /budget/:budgetId

async function updateBudgetData(req, res) {
    try {
        const budgetId = req.params.budgetId;
        const {budget, amountSpent} = req.body;
        const budgetData = await Budget.findByIdAndUpdate(budgetId, {budget, amountSpent}, {new: true});
        res.status(200).json({budgetData});
    } catch (error) {
        res.status(errors.budgetUpdateError.code).json({
            message: errors.budgetUpdateError.message
        });
    }
}

// Handler for DELETE /budget/:budgetId

async function deleteBudgetData(req, res) {
    try {
        const budgetId = req.params.budgetId;
        const budgetData = await Budget.findByIdAndDelete(budgetId);
        res.status(200).json({budgetData});
    } catch (error) {
        res.status(errors.budgetDeleteError.code).json({
            message: errors.budgetDeleteError.message
        });
    }
}

module.exports = {
    getAllBudgetData,
    addBudgetData,
    updateBudgetData,
    deleteBudgetData
};