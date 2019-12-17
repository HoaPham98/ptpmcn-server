const mongoose = require("mongoose");

const BillSchema = mongoose.Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Customer"
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Users"
        },
        order: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Order"
        }],
        totalPrice: {
            type: double,
            required: true,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;