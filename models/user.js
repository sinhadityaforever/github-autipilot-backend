// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	country: { type: String, required: true },
	postalcode: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true }
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
