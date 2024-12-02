const statusCode = require('http-status-codes')

const authentication = (req, res, next) => {
    if (!req.session.user) {
        return res.status(statusCode.FORBIDDEN).json({ message: 'Unauthorized access' })
    }

    console.log('Authenticated User:', req.session.user)

    next()
}

module.exports = authentication
