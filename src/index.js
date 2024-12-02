require('dotenv').config()
require('./config/mongoose.connection')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const StatusCodes = require('http-status-codes')

const corsOptions = require('./config/cors.config')
const sessionConfig = require('./middleware/session')
const connectToDatabase = require('./config/mongoose.connection')
const { logger, logRequestDuration } = require('./utils/logger')
const routes = require('./routes/index')

connectToDatabase()
const app = express()
let PORT = process.env.PORT

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`)
    next()
})

app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
sessionConfig(app)
app.use('/api', routes)
app.use((req, res) => {
    return res.status(404).json({
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: 'The requested route does not exist on this server.'
    })
})

app.listen(PORT, () => {
    console.warn(`server is running on http://localhost:${PORT}/`)
})