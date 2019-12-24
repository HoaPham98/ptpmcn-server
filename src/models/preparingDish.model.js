const mongoose = require("mongoose");

const PreparingDishSchema = mongoose.Schema(
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: "Dish",
            required: true
        },
        chef: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        order: [{
            type: Schema.Types.ObjectId,
            ref: "Bill",
            required: true
        }],
        quantity: {
            type: Number
        },
        status: {
            type: String, //pending, preparing, finished
            required: true,
            default: "pending",
            trim: true
        },
        startAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    },
    {
        timestamp: true
    }
)

const PreparingDish = mongoose.model("PreparingDish", PreparingDishSchema);

module.exports = PreparingDish;