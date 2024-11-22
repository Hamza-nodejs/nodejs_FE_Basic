const express = require('express')
const phoneRoutes = express.Router()
const phoneController = require('../controller/phone.controllers')

phoneRoutes.get('/get-phones', phoneController.getAllPhones)
phoneRoutes.post('/add-phone', phoneController.addPhone)
phoneRoutes.patch('/update-phone/:id', phoneController.updatePhone)
phoneRoutes.delete('/delete/:id', phoneController.deletePhone)

module.exports = phoneRoutes