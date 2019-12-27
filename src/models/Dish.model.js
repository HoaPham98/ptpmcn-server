const mongoose = require("mongoose");
require("./dishUnit.model");

const DishSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DishUnit',
            required: true
        },
        availableTime: {
            type: Number,
            required: true,
            default: 900000 //15 mins
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

DishSchema.post("save", async (doc) => {
    await doc.populate("unit", "name", "DishUnit");
})

DishSchema.post("find", async (docs) => {
    for (let doc of docs) {
        await doc.populate("unit", "name", "DishUnit");
    }
})


DishSchema.post("findOne", async (doc) => {
    await doc.populate("unit", "name", "DishUnit");
})

const Dish = mongoose.model("Dish", DishSchema, "dishes");

module.exports = Dish;