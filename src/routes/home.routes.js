const express = require('express')
const homeRoute = express.Router()
const homeController = require('../controller/home.controller')

homeRoute.get('/details', homeController.getHomeDetails)

module.exports = homeRoute