const crypto = require('crypto')
const statusCode = require('http-status-codes')

module.exports = {
    generateToken: (req, res, next) => {
        if (!req.session.token) {
            req.session.token = crypto.randomBytes(16).toString('hex')
        }
        req.token = req.session.token
        next()
    },
    verifyToken: (req, res, next) => {
        const token = req.headers['x-auth-token']
        if (token && token === req.session.token) {
            next()
        } else {
            res.status(statusCode.UNAUTHORIZED).send('Invalid or missing token')
        }
    },
}
