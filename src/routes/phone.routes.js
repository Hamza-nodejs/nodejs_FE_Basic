const express = require('express')
const phoneRoutes = express.Router()
const phoneController = require('../controller/phone.controllers')
const validationCatches = require('../utils/validationErrorHandling')
const yupValidations = require('../utils/yup.validations')

phoneRoutes.get('/get-phones', phoneController.getAllPhones)
phoneRoutes.post('/add-phone', validationCatches(yupValidations.addPhoneValidation), phoneController.addPhone)
phoneRoutes.patch('/update-phone/:id', validationCatches(yupValidations.updatePhoneValidation), phoneController.updatePhone)
phoneRoutes.delete('/delete/:id', phoneController.deletePhone)

module.exports = phoneRoutes