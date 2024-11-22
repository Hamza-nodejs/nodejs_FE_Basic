require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
let PORT = process.env.PORT
app.use(cors())


app.listen(PORT, () => {
    console.warn(`server is running on http://localhost:${PORT}/`)
})