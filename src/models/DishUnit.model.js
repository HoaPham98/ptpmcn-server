const mongoose = require('mongoose')

const dishUnitSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const DishUnit = mongoose.model('DishUnit', dishUnitSchema, "dishUnit");

module.exports = DishUnit