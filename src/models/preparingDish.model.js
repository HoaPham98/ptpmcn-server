const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreparingDishSchema = mongoose.Schema(
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: "Dish",
            required: true
        },
        bills: [{
            type: Schema.Types.ObjectId,
            ref: "Bill",
            required: true
        }],
        quantity: {
            type: Number,
            required: true
        },
        status: {
            type: String, //pending, preparing, finished
            required: true,
            default: "pending",
            trim: true
        },
        startAt: {
            type: Date,
            required: false,
        }
    },
    {
        timestamp: true
    }
)

const PreparingDish = mongoose.model("PreparingDish", PreparingDishSchema, "preparingDishes");

module.exports = PreparingDish;