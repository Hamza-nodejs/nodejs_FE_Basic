const express = require('express')
const calendlyRoutes = express.Router()
const calendlyController = require('../controller/calendly.controller')

calendlyRoutes.get('/oauth/authorize', calendlyController.getCalendlyAuthUrl)
calendlyRoutes.get('/oauth/redirect', calendlyController.handleCalendlyOAuthRedirect)

module.exports = calendlyRoutes
