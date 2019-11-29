const mongoose = require('mongoose')
const Schema = mongoose.Schema

const areaSchema = Schema({
    name: {
        type: String,
        required: true
    },
    tables: [{
        type: Schema.Types.ObjectId,
        ref: 'Table'
    }]
})

const Area = mongoose.model('Area', areaSchema)

module.exports = Area