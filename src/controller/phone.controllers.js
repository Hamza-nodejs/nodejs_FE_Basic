const statusCodes = require('http-status-codes')
const Phone = require('../models/phone.model')

const getAllPhones = async (req, res) => {
    try {
        const phones = await Phone.find()
        console.log('phones', phones)
        if (!phones || phones.length == 0) {
            return res.status(statusCodes.OK).json({ statusCode: statusCodes.OK, message: 'No phones to fetched' })
        }
        return res.status(statusCodes.OK).json({ statusCodes: statusCodes.OK, message: 'All phones fetched', data: phones })
    } catch (error) {
        console.error('error in getAllPhones', error.message)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ statuaCode: statusCodes.INTERNAL_SERVER_ERROR, message: 'internal server error' })
    }
}

const addPhone = async (req, res) => {
    const { make, model, variant } = req.body
    try {
        const newPhone = await Phone.create({ make, model, variant })
        return res.status(statusCodes.CREATED).json({ statusCodes: statusCodes.CREATED, message: 'Phone added successfully', data: newPhone })
    } catch (error) {
        console.error('error in addPhone', error.message)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ statuaCode: statusCodes.INTERNAL_SERVER_ERROR, message: 'internal server error' })
    }
}

const updatePhone = async (req, res) => {
    res.end('phone updated')
}

const deletePhone = async (req, res) => {
    res.end('phone deleted')
}

module.exports = {
    getAllPhones,
    addPhone,
    updatePhone,
    deletePhone
}