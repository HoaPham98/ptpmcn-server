const mongoose = require("mongoose");
const Schema = mongoose.Schema

const BillSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        customer: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Customer"
        },
        order: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Order"
        }],
        totalPrice: {
            type: Schema.Types.Decimal128,
            required: true
        },
        tables: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Table'
        }],
        isFinished: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;