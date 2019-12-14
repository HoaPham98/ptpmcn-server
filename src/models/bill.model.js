const mongoose = require("mongoose");
const Schema = mongoose.Schema

const BillSchema = mongoose.Schema(
    {
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
            type: Decimal128,
            required: true
        },
        tables: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Table'
        }]
    },
    {
        timestamps: true
    }
)

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;