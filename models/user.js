// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phone: { type: Number },
	address: { type: String },
	country: { type: String },
	postalcode: { type: String },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	profilePicture: { type: String },
	monthBudget: { type: Number, default: 0 },
	yearBudget: { type: Number, default: 0 }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
		next();
	} catch (error) {
		return next(error);
	}
});

module.exports = mongoose.model('User', userSchema);
