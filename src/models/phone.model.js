const mongoose = require('mongoose')
const moment = require('moment-timezone')

const phoneSchema = new mongoose.Schema(
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

phoneSchema.virtual('createdAtEST').get(function () {
    return moment(this.createdAt).tz('America/New_York').format()
})

phoneSchema.virtual('updatedAtEST').get(function () {
    return moment(this.updatedAt).tz('America/New_York').format()
})

phoneSchema.set('toJSON', { virtuals: true })
phoneSchema.set('toObject', { virtuals: true })

const Phone = mongoose.model('Vehicle', phoneSchema)

module.exports = Phone
