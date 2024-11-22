const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.MONGO_URI
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB successfully')
        console.warn(`${connectionString}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1)
    }
}

module.exports = connectToDatabase