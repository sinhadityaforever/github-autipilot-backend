// Import any necessary dependencies, models, or services
const Transaction = require('../models/Transaction');

// Handler for GET /transactions
async function getAllTransactions(req, res) {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();

    // Send the transactions as a response
    res.json(transactions);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: 'An error occurred' });
  }
}

// Handler for POST /transactions
async function createTransaction(req, res) {
  const transactionData = req.body;

  try {
    // Create a new transaction using the transactionData
    const newTransaction = await Transaction.create(transactionData);

    // Send the new transaction as a response
    res.json(newTransaction);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: 'An error occurred' });
  }
}

// Handler for PUT /transactions/:transactionId
async function updateTransaction(req, res) {
  const transactionId = req.params.transactionId;
  const updatedTransactionData = req.body;

  try {
    // Find the transaction by ID and update it with the updatedTransactionData
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updatedTransactionData,
      { new: true }
    );

    // Send the updated transaction as a response
    res.json(updatedTransaction);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: 'An error occurred' });
  }
}

// Handler for DELETE /transactions/:transactionId
async function deleteTransaction(req, res) {
  const transactionId = req.params.transactionId;

  try {
    // Find the transaction by ID and delete it
    await Transaction.findByIdAndDelete(transactionId);

    // Send a success response
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: 'An error occurred' });
  }
}

// Handler for GET /transactions/insights/last-five-years
async function getLastFiveYearsData(req, res) {
    try {
      // Calculate the date five years ago from the current date
      const currentDate = new Date();
      const fiveYearsAgo = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
  
      // Retrieve transactions for the last five years from the database
      const transactions = await Transaction.find({ date: { $gte: fiveYearsAgo } });
  
      // Send the transactions as a response
      res.json(transactions);
    } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ error: 'An error occurred' });
    }
  }

// Export the controller functions
module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getLastFiveYearsData,
};
