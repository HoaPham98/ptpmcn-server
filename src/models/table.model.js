const mongoose = require("mongoose");

const TableSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        isAvailable: {
            type: Boolean,
            required: true,
            default: true
        },
        currentBill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bill',
            required: false,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;