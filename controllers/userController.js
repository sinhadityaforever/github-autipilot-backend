const User = require('../models/user');
const errorList = require('../errors');
const profilePicURL = require('../profileAvatarGenerator');
const userController = {};

userController.getUserInfo = async (req, res, next) => {
	try {
		const userId = req.userId;

		console.log('userId', userId);
		const user = await User.findById(userId);
		if (!user) {
			return res.status(errorList.default.userNotFoundError.code).json({
				message: errorList.default.userNotFoundError.message
			});
		}
		res.status(200).json({
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			profilePicture: user.profilePicture,
			phone: user.phone,
			address: user.address,
			country: user.country,
			postalcode: user.postalcode
		});
	} catch (error) {
		res.status(errorList.default.unknownError.code).json({
			message: errorList.default.unknownError.message,
			error
		});
	}
};

userController.updateUserInfo = async (req, res, next) => {
	try {
		const userId = req.userId;
		const {
			firstname,
			lastname,
			email,
			phone,
			address,
			country,
			postalcode,
			profilePicture
		} = req.body;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(errorList.default.userNotFoundError.code).json({
				message: errorList.default.userNotFoundError.message
			});
		}
		if (firstname) user.firstname = firstname;

		if (lastname) user.lastname = lastname;
		if (email) user.email = email;
		if (phone) user.phone = phone;
		if (address) user.address = address;
		if (country) user.country = country;
		if (postalcode) user.postalcode = postalcode;
		if (profilePicture) user.profilePicture = profilePicture;

		await user.save();
		res.status(200).json({
			message: 'User info updated successfully'
		});
	} catch (error) {
		res.status(errorList.default.unknownError.code).json({
			message: errorList.default.unknownError.message,
			error
		});
	}
};

userController.getNewAvatar = async (req, res, next) => {
	try {
		const profilePicture = profilePicURL();
		res.status(200).json({ profilePicture });
	} catch (error) {
		res.status(errorList.default.unknownError.code).json({
			message: errorList.default.unknownError.message,
			error
		});
	}
};

module.exports = userController;
