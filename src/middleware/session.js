const session = require('express-session')

module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
                // maxAge: 1000 * 60,  // 1 minute
                sameSite: 'Strict'
            }
        })
    )
}