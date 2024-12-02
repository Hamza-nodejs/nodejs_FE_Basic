const express = require('express')
const authRoute = require('./auth.routes')
const routes = express.Router()

routes.use('/auth', authRoute)

module.exports = routes