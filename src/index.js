require('dotenv').config()
require('./config/mongoose.connection')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const corsOptions = require('./config/cors.config')

const app = express()
let PORT = process.env.PORT

app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.warn(`server is running on http://localhost:${PORT}/`)
})