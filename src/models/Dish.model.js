const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'DishUnit'
    }
})

const Dish = mongoose.model('Dish', dishSchema)