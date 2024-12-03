const express = require('express')
const calendlyRoutes = express.Router()
const calendlyController = require('../controller/calendly.controller')

calendlyRoutes.use((req, res, next) => {
    req.user = {
        name: 'mh408800',
        email: 'm.hamza.liaqat@hotmail.com',
    }
    next()
})

calendlyRoutes.get('/schedule-meeting', calendlyController.getCalendlyAuthUrl)
calendlyRoutes.get('/oauth/redirect', calendlyController.handleCalendlyOAuthRedirect)
calendlyRoutes.get('/host/events', calendlyController.fetchHostEvents)
calendlyRoutes.post('/webhook', calendlyController.calendlyWebHook)
calendlyRoutes.post('/webhook/receive', calendlyController.handleCalendlyWebhook)

module.exports = calendlyRoutes
