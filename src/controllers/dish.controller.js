const dishService = require("../services/dish.service");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const validator = require("validator");

async function getDishes(req, res) {

    const dishes = await dishService.getDishes();

    res.status(201).send({
        status: 1,
        results: dishes
    })
}

module.exports = {
    getDishes
}