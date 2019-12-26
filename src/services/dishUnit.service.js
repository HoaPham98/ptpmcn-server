const mongoose = require('mongoose')
const DishUnit = mongoose.model("DishUnit");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createDishUnit(infoDishUnit) {
    const keys = Object.keys(infoDishUnit);
    const allowedKeys = ["name"];

    const isValidKeys = keys.every(item => allowedKeys.includes(item));

    if (!isValidKeys)
        throw new CustomError(errorCode.BAD_REQUEST, "Keys in infoDishUnit is not valid!");

    const dishUnit = await DishUnit.create(infoDishUnit);

    return dishUnit;
}

async function updateDishUnit(idDishUnit, infoDishUnit) {
    const keys = Object.keys(infoDishUnit);
    const allowedKeys = ["name"];

    const isValidKeys = keys.every(item => allowedKeys.includes(item));

    if (!isValidKeys)
        throw new CustomError(errorCode.BAD_REQUEST, "Keys in infoDishUnit is not valid!");

    let dishUnit = await DishUnit.findByIdAndUpdate(idDishUnit, infoDishUnit, { new: true });

    return dishUnit;
}

async function deleteDishUnit(idDishUnit) {
    const dishUnit = await DishUnit.findById(idDishUnit);
    if (!dishUnit)
        throw new CustomError(errorCode.NOT_FOUND, "Dish Unit not found to delete!");


    await DishUnit.findByIdAndDelete(idDishUnit);

    return dishUnit;
}

async function getDishUnit(idDishUnit) {
    const dishUnit = await DishUnit.findById(idDishUnit);
    if (!dishUnit)
        throw new CustomError(errorCode.NOT_FOUND, "Dish not found to delete!");

    return dishUnit;
}

module.exports = {
    getDishUnit,
    deleteDishUnit,
    updateDishUnit,
    createDishUnit
}
