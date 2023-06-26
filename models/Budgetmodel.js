const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Assuming there's a User model for referencing the user
		required: true
	},
	categoryId: {
		type: Number,
		required: true
	},
	budget: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Budget', BudgetSchema);
