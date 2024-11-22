require('dotenv').config()
require('./config/mongoose.connection')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const corsOptions = require('./config/cors.config')
const connectToDatabase = require('./config/mongoose.connection')
const routes = require('./routes')

connectToDatabase()
const app = express()
let PORT = process.env.PORT

app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'The requested route does not exist on this server.'
    })
})

app.listen(PORT, () => {
    console.warn(`server is running on http://localhost:${PORT}/`)
})