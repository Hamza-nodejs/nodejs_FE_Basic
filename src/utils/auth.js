const jwtHelper = require('./jwtHelper')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' })
    }

    try {
        const decoded = jwtHelper.verifyToken(token)
        // add the logic here to find the user from the db.
        // for more security of application
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = auth
