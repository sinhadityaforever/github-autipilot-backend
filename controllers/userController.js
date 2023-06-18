const User = require('../models/user');
const errorList = require('../errors');
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
			profilePicture: user.profilePicture
		});
	} catch (error) {
		res.status(errorList.default.unknownError.code).json({
			message: errorList.default.unknownError.message,
			error
		});
	}
};

module.exports = userController;
