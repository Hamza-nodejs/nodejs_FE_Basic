const statusCode = require('http-status-codes')


const authentication = (req, res, next) => {
    const sessionId = req.headers['authorization']
    if (!sessionId) {
        return res.status(statusCode.FORBIDDEN).json({ message: 'Session ID is required' })
    }

    if (!req.session.user || req.sessionID !== sessionId) {
        return res.status(statusCode.FORBIDDEN).json({ message: 'Unauthorized access' })
    }
    next()
}

module.exports = authentication