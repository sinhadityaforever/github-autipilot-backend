const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorList = require('../errors');
const profilePicURL = require('../profileAvatarGenerator');

const authController = {};

authController.signup = async (req, res, next) => {
	try {
		const { email, password, firstname, lastname } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(errorList.default.userExistsError.code)
				.json({ message: errorList.default.userExistsError.message });
		}

		const profilePicture = profilePicURL();
		console.log(profilePicture);
		const user = new User({
			email,
			password,
			firstname,
			lastname,
			profilePicture
		});
		await user.save();
		res.status(200).json({ message: 'User created' });
	} catch (error) {
		console.log(error);
		res.status(errorList.default.unknownError.code).json({
			message: errorList.default.unknownError.message,
			error
		});
	}
};

authController.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(errorList.default.userNotFoundError.code).json({
				message: errorList.default.userNotFoundError.message
			});
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(errorList.default.incorrectPasswordError.code).json({
				message: errorList.default.incorrectPasswordError.message
			});
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
			expiresIn: '24h'
		});

		res.status(200).json({
			token
		});
	} catch (error) {
		res.status(errorList.default.unknownError.code).json({
			message: errorList.default.unknownError.message,
			error
		});
	}
};

module.exports = authController;
