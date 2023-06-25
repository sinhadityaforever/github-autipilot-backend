const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Assuming there's a User model for referencing the user
		required: true
	},
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Transaction', transactionSchema);
