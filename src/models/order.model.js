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
        users: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        tables: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Table"
        }],
        dishes: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Dish"
        }]
    },
    {
        timestamps: true
    })

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;