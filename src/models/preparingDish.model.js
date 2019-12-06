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
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        status: {
            type: String, //pending, preparing, finished
            required: true,
            default: "pending",
            trim: true
        }
    },
    {
        timestamp: true
    }
)

const PreparingDish = mongoose.model("PreparingDish", PreparingDishSchema);

module.exports = PreparingDish;