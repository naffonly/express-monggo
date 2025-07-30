const express = require('express');
const router = express.Router();
const {
    validatorUser,
    validationLogin
} = require('../utils/validator')

const authController = require('../controllers/auth')


router.post('/register', validatorUser, authController.register)
router.post('/login',validationLogin,authController.login)

module.exports = router