const jwt = require('jsonwebtoken');
const errorList = require('../errors');
const authMiddleWare = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		console.log('No token found');
		return res.status(errorList.default.authError.code).json({
			message: errorList.default.authError.message
		});
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.userId = decodedToken.userId;
		next();
	} catch (error) {
		res.status(errorList.default.authError.code).json({
			message: errorList.default.authError.message,
			error
		});
	}
};

module.exports = authMiddleWare;
