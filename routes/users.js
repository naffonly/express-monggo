const express = require('express');
const router = express.Router()

const {verifyToken} = require('../middleware/middleware')
const userController = require('../controllers/user')

router.get('/users', verifyToken,userController.getUsers)

module.exports = router