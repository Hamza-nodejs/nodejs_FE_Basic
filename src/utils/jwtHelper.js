const jwt = require('jsonwebtoken')

const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw new Error('Invalid or expired token')
    }
}

module.exports = {
    generateToken,
    verifyToken,
}