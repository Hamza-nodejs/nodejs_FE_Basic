const express = require('express')
const authRoute = require('./auth.routes')
const homeRoute = require('./home.routes')
const authentication = require('../middleware/auth')
const routes = express.Router()

routes.use('/auth', authRoute)
routes.use(authentication)
routes.use('/home', homeRoute)

module.exports = routes