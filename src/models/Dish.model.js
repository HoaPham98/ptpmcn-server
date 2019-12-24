const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = mongoose.Schema(
    {
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
        },
        availableTime: {
            type: Schema.Types.Decimal128,
            required: true,
            default: 900000 //15 mins
        },
        isAvailable: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Dish = mongoose.model('Dish', dishSchema)