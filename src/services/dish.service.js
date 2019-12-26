const mongoose = require('mongoose')
const Dish = mongoose.model('Dish')
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function getDishes() {
    const dishes = await Dish.find()

    return dishes
}

async function createDish(infoDish) {
    const keys = Object.keys(infoDish);
    const allowedKeys = ["name", "price", "unit", "availableTime", "isAvailable"];

    const isValidKeys = keys.every(item => allowedKeys.includes(item));

    if (!isValidKeys)
        throw new CustomError(errorCode.BAD_REQUEST, "Keys in infoDish is not valid!");

    const dish = await Dish.create(infoDish);

    return dish;
}

async function updateDish(idDish, infoDish) {
    const keys = Object.keys(infoDish);
    const allowedKeys = ["name", "price", "unit", "availableTime", "isAvailable"];

    const isValidKeys = keys.every(item => allowedKeys.includes(item));

    if (!isValidKeys)
        throw new CustomError(errorCode.BAD_REQUEST, "Keys in infoDish is not valid!");

    let dish = await Dish.findByIdAndUpdate(idDish, infoDish, { new: true });

    return dish;
}

async function deleteDish(idDish) {
    const dish = await Dish.findById(idDish);
    if (!dish)
        throw new CustomError(errorCode.NOT_FOUND, "Dish not found to delete!");


    await Dish.findByIdAndDelete(idDish);

    return dish;
}

async function getDish(idDish) {
    const dish = await Dish.findById(idDish);
    if (!dish)
        throw new CustomError(errorCode.NOT_FOUND, "Dish not found to delete!");

    return dish;
}

module.exports = {
    getDishes,
    getDish,
    deleteDish,
    updateDish,
    createDish
}
