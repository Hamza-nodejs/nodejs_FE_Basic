const statusCodes = require('http-status-codes')
const { generateToken } = require('../utils/jwtHelper')

const generateTokens = async (req, res) => {
    let user = {
        _id: '67402a15aa9ac7dbfc0223dc',
        name: 'Muhammad Hamza Liaqat',
        role: 'regular_user',
        account: 'active'
    }
    try {
        const token = await generateToken(user)
        return res.status(statusCodes.CREATED).json({
            statusCode: statusCodes.CREATED,
            message: 'Token generated successfully',
            token,
        })

    } catch (error) {
        console.error('error in generating the token', error.message)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ statusCodes: statusCodes.INTERNAL_SERVER_ERROR, message: 'internal server error', error: error.message })
    }
}

module.exports = {
    generateTokens
}