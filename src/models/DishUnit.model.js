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

const DishUnit = mongoose.model('DishUnit', userSchema)

module.exports = DishUnit