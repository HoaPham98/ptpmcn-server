const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        tel: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false,
            default: ""
        },
        email: {
            type: String,
            required: false,
            default: ""
        }
    },
    {
        timestamp: true
    }
)

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;