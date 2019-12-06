const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Customer"
        },
        order: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Order"
        },
        totalPrice: {
            type: double,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;