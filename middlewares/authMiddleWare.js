const jwt = require('jsonwebtoken');
const errorList = require('../errors');
const authMiddleWare = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		return res.status(errorList.default.unauthorizedError.code).json({
			message: errorList.default.unauthorizedError.message
		});
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.userId = decodedToken.userId;
		next();
	} catch (error) {
		res.status(errorList.default.unauthorizedError.code).json({
			message: errorList.default.unauthorizedError.message,
			error
		});
	}
};

module.exports = authMiddleWare;
