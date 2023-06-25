const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authMiddleWare = require('../middlewares/authMiddleWare');

router.get('/getUser', authMiddleWare, userController.getUserInfo);
router.put('/updateUser', authMiddleWare, userController.updateUserInfo);
router.get('/getNewAvatar', authMiddleWare, userController.getNewAvatar);

module.exports = router;
