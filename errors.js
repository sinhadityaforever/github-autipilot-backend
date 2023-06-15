const errorList = {
	authError: {
		code: 401,
		message: 'Unauthorized'
	},
	userExistsError: {
		code: 409,
		message: 'User already exists'
	},
	userNotFoundError: {
		code: 402,
		message: 'User not found'
	},
	unknownError: {
		code: 500,
		message: 'Unknown error'
	},
	incorrectPasswordError: {
		code: 403,
		message: 'Incorrect password'
	}
};
exports.default = errorList;
