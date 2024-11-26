const express = require('express')
const calendlyRoutes = express.Router()
const calendlyController = require('../controller/calendly.controller')

// mock jwt token for testing purpose

calendlyRoutes.use((req, res, next) => {
    req.user = {
        name: 'mh408800',
        email: 'm.hamza.liaqat@hotmail.com',
    }
    next()
})

calendlyRoutes.get('/schedule-meeting', calendlyController.getCalendlyAuthUrl)
calendlyRoutes.get('/oauth/redirect', calendlyController.handleCalendlyOAuthRedirect)

module.exports = calendlyRoutes
