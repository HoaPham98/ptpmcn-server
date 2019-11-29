const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = Schema({
    name: {
        type: String,
        required: true
    },
    dishes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        }
    ]
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu