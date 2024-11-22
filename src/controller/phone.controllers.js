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
    const phoneId = req.params.id
    try {
        const recordExist = await Phone.findById(phoneId)
        if (!recordExist) {
            return res.status(statusCodes.BAD_REQUEST).json({ statusCode: statusCodes.BAD_REQUEST, message: 'Phone does not exits' })
        }
        const updateData = req.body
        const updatedPhone = await Phone.findByIdAndUpdate(phoneId, updateData, {
            new: true
            // runValidators: true,
        })
        console.log(updatedPhone)
        return res.status(statusCodes.OK).json({ statusCodes: statusCodes.OK, message: 'Record updated successfully', data: updatePhone })

    } catch (error) {
        console.error('error in getAllPhones', error.message)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ statuaCode: statusCodes.INTERNAL_SERVER_ERROR, message: 'internal server error' })
    }
}

const deletePhone = async (req, res) => {
    try {
        const deletedPhone = await Phone.findByIdAndDelete(req.params.id)

        if (!deletedPhone) {
            return res.status(statusCodes.BAD_REQUEST).json({
                statusCode: statusCodes.BAD_REQUEST,
                message: 'Phone does not exist',
            })
        }

        return res.status(statusCodes.OK).json({
            statusCode: statusCodes.OK,
            message: 'Phone deleted successfully',
            data: deletedPhone,
        })
    } catch (error) {
        console.error('Error in deletePhone:', error.message)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
        })
    }
}

module.exports = {
    getAllPhones,
    addPhone,
    updatePhone,
    deletePhone
}