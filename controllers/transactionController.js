// Import any necessary dependencies, models, or services
const { default: errors } = require('../errors');
const Transaction = require('../models/Transaction');

// Handler for GET /transactions
async function getAllTransactionsData(req, res) {
	try {
		const userId = req.userId;

		//Below are the formats to send to the client (All should be arrays, and lastly, merged into one object and sent to the client):

		//1.  transactions format for client: {name, transactionId, date, type, category, amount} (This will be used for further processing)
		const transactions = await Transaction.find({ userId });

		//2.  lastFiveYearsData format for client: {index, income, expense}, index =0 (this year), =-1 (last year), =-2 (2 years ago), =-3 (3 years ago), =-4 (4 years ago), =-5 (5 years ago)
		const lastFiveYearData = [];
		const currentYear = new Date().getFullYear();

		for (let i = 0; i >= -4; i--) {
			const year = currentYear + i;
			const yearData = {
				index: i,
				income: 0,
				expense: 0
			};

			const filteredTransactions = transactions.filter((transaction) => {
				const transactionYear = new Date(transaction.date).getFullYear();
				return transactionYear === year;
			});

			filteredTransactions.forEach((transaction) => {
				if (transaction.type === 'income') {
					yearData.income += transaction.amount;
				} else if (transaction.type === 'expense') {
					yearData.expense += transaction.amount;
				}
			});

			lastFiveYearData.push(yearData);
		}

		//3. thisYearData format for client: {index, income, expenditure}, index =0 (this month), =-1 (last month), =-2 (2 months ago), =-3 (3 months ago), till -12 (12 months ago)

		const thisYearData = []; //Add logic below

		//4. sixMonthsCategoryData format: {categoryId, data=[thisMonth, lastMonth, 2MonthsAgo, 3MonthsAgo, 4MonthsAgo, 5MonthsAgo, 6MonthsAgo]}
		const sixMonthsCategoryData = []; //Add logic below

		//send all the data to the client
		res.status(200).json({
			transactions,
			lastFiveYearData,
			thisYearData,
			sixMonthsCategoryData
		});
	} catch (error) {
		res.status(errors.transactionFetchError.code).json({
			message: errors.transactionFetchError.message
		});
	}
}

// Handler for POST /transactions
async function createTransaction(req, res) {
	const transactionData = req.body;
	const userId = req.userId;
	transactionData.userId = userId;

	try {
		// Create a new transaction using the transactionData
		await Transaction.create(transactionData);

		res.status(200).json({ message: 'Transaction created successfully' });
	} catch (error) {
		// Handle any errors that occur
		res
			.status(errors.transactionCreateError.code)
			.json({ message: errors.transactionCreateError.message });
	}
}

// Handler for PUT /transactions/:transactionId
async function updateTransaction(req, res) {
	const transactionId = req.params.transactionId;
	const updatedTransactionData = req.body;
	const userId = req.userId;

	try {
		// Find the transaction by ID and update it with the updatedTransactionData
		const transaction = await Transaction.findById(transactionId);
		if (transaction.userId !== userId) {
			return res
				.status(403)
				.json({ message: 'You are not authorized to update this transaction' });
		}
		transaction.name = updatedTransactionData.name;
		transaction.date = updatedTransactionData.date;
		transaction.type = updatedTransactionData.type;
		transaction.category = updatedTransactionData.category;
		transaction.amount = updatedTransactionData.amount;
		await transaction.save();

		// Send the updated transaction as a response
		res.status(200).json({ message: 'Transaction updated successfully' });
	} catch (error) {
		// Handle any errors that occur
		res.status(500).json({ error: 'An error occurred while updating' });
	}
}

// Handler for DELETE /transactions/:transactionId
async function deleteTransaction(req, res) {
	const transactionId = req.params.transactionId;
	const userId = req.userId;
	try {
		// Find the transaction by ID and delete it
		const transaction = await Transaction.findById(transactionId);
		if (transaction.userId !== userId) {
			return res
				.status(403)
				.json({ message: 'You are not authorized to delete this transaction' });
		}
		await Transaction.findByIdAndDelete(transactionId);

		// Send a success response
		res.status(200).json({ message: 'Transaction deleted successfully' });
	} catch (error) {
		// Handle any errors that occur
		res.status(500).json({ error: 'An error occurred' });
	}
}

// Export the controller functions
module.exports = {
	getAllTransactionsData,
	createTransaction,
	updateTransaction,
	deleteTransaction
};
