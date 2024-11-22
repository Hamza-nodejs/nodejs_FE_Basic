const express = require('express')
const userRoutes = express.Router()
const userController = require('../controller/user.controller')

userRoutes.get('/generate-token', userController.generateTokens)

module.exports = userRoutes