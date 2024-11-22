const express = require('express')
const phoneRoutes = require('./phone.routes')

const routes = express.Router()

// routes.use(authToken)
routes.use('/phones', phoneRoutes)

module.exports = routes
