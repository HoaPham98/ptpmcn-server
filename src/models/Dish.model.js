const mongoose = require("mongoose");
require("./dishUnit.model");

const DishSchema = mongoose.Schema(
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DishUnit',
            required: true
        },
        availableTime: {
            type: Number,
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

const Dish = mongoose.model("Dish", DishSchema, "dishes");

module.exports = Dish;