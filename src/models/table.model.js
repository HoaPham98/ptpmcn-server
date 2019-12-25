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
        }
    },
    {
        timestamps: true
    }
)

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;