const mongoose = require('mongoose')
const moment = require('moment-timezone')

const vehicleSchema = new mongoose.Schema(
    {
        make: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },
        variant: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

vehicleSchema.virtual('createdAtEST').get(function () {
    return moment(this.createdAt).tz('America/New_York').format()
})

vehicleSchema.virtual('updatedAtEST').get(function () {
    return moment(this.updatedAt).tz('America/New_York').format()
})

vehicleSchema.set('toJSON', { virtuals: true })
vehicleSchema.set('toObject', { virtuals: true })

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle
