const mongoose = require("mongoose");
const Schema = mongoose.Schema

const BillSchema = mongoose.Schema(
    {
        employee: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        customer: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Customer"
        },
        orders: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Order"
        }],
        totalPrice: {
            type: Number,
            required: true,
            default: 0
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

BillSchema.post("save", async (doc) => {
    // await doc.populate("orders", ["status", "openDate", "employee", "dishes"]).execPopulate();
    await doc.populate("employee", ["_id", "name"]).execPopulate();
    await doc.populate("tables", ["_id", "name", "isAvailable"]).execPopulate();
})

const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;