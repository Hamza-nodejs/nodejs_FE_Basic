const express = require('express')
const phoneRoutes = require('./phone.routes')
const userRoutes = require('./user.routes')
const auth = require('../utils/auth')
const calendlyRoutes = require('./calendly.routes')

const routes = express.Router()

routes.use('/user', userRoutes)
routes.use('/calendly', calendlyRoutes)
routes.use(auth)
routes.use('/phones', phoneRoutes)

module.exports = routes
