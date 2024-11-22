const mongoose = require('mongoose');
const moment = require('moment-timezone');

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
        createdAtEST: {
            type: String,
        },
        updatedAtEST: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware to set EST timestamps
phoneSchema.pre('save', function (next) {
    const now = moment.tz('America/New_York').format();
    this.createdAtEST = this.createdAtEST || now;
    this.updatedAtEST = now;
    next();
});

phoneSchema.pre('findOneAndUpdate', function (next) {
    const now = moment.tz('America/New_York').format();
    this._update.updatedAtEST = now;
    next();
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
