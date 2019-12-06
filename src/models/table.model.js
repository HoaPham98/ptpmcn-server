const mongoose = require("mongoose");

const TableSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        area: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Area"
        },
        isAvailable: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;