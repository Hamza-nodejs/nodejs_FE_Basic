const statusCode = require('http-status-codes')

exports.getHomeDetails = async (req, res) => {
    const details = {
        name: 'Muhammad Hamza Liaqat'
    }
    return res.status(statusCode.OK).json({ statusCode: statusCode.OK, message: 'details fetched', data: details })
}