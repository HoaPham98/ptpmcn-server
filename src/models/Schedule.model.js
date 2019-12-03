const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    },
    shift: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule