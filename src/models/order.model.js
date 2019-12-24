const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        status: {
            type: String, //"open", "closed"
            required: true,
            default: open
        },
        openDate: {
            type: Date,
            required: true,
            default: Date.now()
        },
        closeDate: {
            type: Date,
            required: true
        },
        employee: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        dishes: [{
            dish: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "Dish"
            },
            quantity: {
                type: Number,
                required: true
            },
            isDone: {
                type: Boolean,
                required: true,
                default: false
            }
        }],
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    })

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;