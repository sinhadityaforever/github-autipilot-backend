// Import any necessary dependencies, models, or services
const { default: errors } = require('../errors');
const Transaction = require('../models/transactionmodel');

// Handler for GET /transactions
async function getAllTransactionsData(req, res) {
	try {
		const userId = req.userId;

		//Below are the formats to send to the client (All should be arrays, and lastly, merged into one object and sent to the client):

		//1.  transactions format for client: {name, transactionId, date, type, category, amount} (This will be used for further processing)
		const transactions = await Transaction.find({ userId });

		// *. Prepare transactions data for the client
		const transactionsData = transactions.map((transaction) => ({
			name: transaction.name,
			transactionId: transaction._id,
			date: transaction.date,
			type: transaction.type,
			category: transaction.category,
			amount: transaction.amount
		}));

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

		const thisYearData = [];
		const currentDate = new Date();

		for (let i = 0; i <= 11; i++) {
			const month = currentDate.getMonth() - i;
			const year = currentDate.getFullYear();
			const monthData = {
				index: i,
				income: 0,
				expenditure: 0
			};

			const filteredTransactions = transactions.filter((transaction) => {
				const transactionDate = new Date(transaction.date);
				return (
					transactionDate.getFullYear() === year &&
					transactionDate.getMonth() === month
				);
			});

			filteredTransactions.forEach((transaction) => {
				if (transaction.type === 'income') {
					monthData.income += transaction.amount;
				} else if (transaction.type === 'expense') {
					monthData.expenditure += transaction.amount;
				}
			});

			thisYearData.push(monthData);
		} //Add logic below

		//4. sixMonthsCategoryData format: {categoryId, data=[thisMonth, lastMonth, 2MonthsAgo, 3MonthsAgo, 4MonthsAgo, 5MonthsAgo, 6MonthsAgo]}

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

		const sixMonthsAgo = new Date();
		sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

		// Create an array to store the six months category data
		const sixMonthsCategoryData = [];

		// Loop through each category
		for (const category of categories) {
			if (category.type === 'income') continue; // Skip income categories (we only want expense categories
			const categoryId = category.id;
			const categoryVal = category.value;

			const categoryData = [];

			// Loop through each month for the last six months
			let currentDatePointer = new Date(sixMonthsAgo);
			while (currentDatePointer <= currentDate) {
				const startDate = new Date(currentDatePointer);
				startDate.setDate(1); // Set the start date to the 1st day of the month
				const endDate = new Date(startDate);
				endDate.setMonth(endDate.getMonth() + 1);
				endDate.setDate(0);

				// Filter transactions for the current category and month
				const filteredTransactions = transactions.filter((transaction) => {
					const transactionDate = new Date(transaction.date);
					return (
						transaction.category === categoryVal &&
						transaction.type === category.type &&
						transactionDate >= startDate &&
						transactionDate <= endDate
					);
				});

				// Calculate the total amount for the current category and month
				const totalAmount = filteredTransactions.reduce(
					(total, transaction) => total + transaction.amount,
					0
				);

				// Add the total amount to the category data array
				categoryData.push(totalAmount);

				// Move to the next month
				currentDatePointer.setMonth(currentDatePointer.getMonth() + 1);
			}

			// Add the category data to the six months category data array
			sixMonthsCategoryData.push({
				categoryId,
				data: categoryData
			});
		}

		//Add logic below

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
		const newTransaction = await Transaction.create(transactionData);

		res.status(200).json({
			message: 'Transaction created successfully',
			transactionId: newTransaction._id
		});
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

		if (JSON.stringify(transaction.userId) !== JSON.stringify(userId)) {
			return res
				.status(403)
				.json({ message: 'You are not authorized to update this transaction' });
		}
		transaction.name = updatedTransactionData.name;
		transaction.date = updatedTransactionData.date;
		transaction.category = updatedTransactionData.category;
		transaction.amount = updatedTransactionData.amount;

		await transaction.save();
		// Send the updated transaction as a response
		res.status(200).json({ message: 'Transaction updated successfully' });
	} catch (error) {
		// Handle any errors that occur
		console.log(error);
		res.status(500).json({ error: 'An error occurred while updating' });
	}
}

// Handler for DELETE /transactions/:transactionId
async function deleteTransaction(req, res) {
	const transactionId = req.params.transactionId;
	console.log(transactionId);
	const userId = req.userId;
	try {
		// Find the transaction by ID and delete it
		const transaction = await Transaction.findById(transactionId);

		if (JSON.stringify(transaction.userId) !== JSON.stringify(userId)) {
			return res
				.status(403)
				.json({ message: 'You are not authorized to delete this transaction' });
		}
		console.log('done');
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
