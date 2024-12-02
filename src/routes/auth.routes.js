const express = require('express')
const authRoute = express.Router()
const authController = require('../controller/auth.controller')

authRoute.post('/register', authController.registerUser)
authRoute.post('/login', authController.loginUser)
authRoute.post('/logout', authController.logoutUser)

module.exports = authRoute