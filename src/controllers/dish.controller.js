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

async function createDish(req, res) {
    const infoDish = req.body;

    const dish = await dishService.createDish(infoDish);
    res.status(201).send({
        status: 1,
        results: dish
    })
}

async function getDish(req, res) {
    const { idDish } = req.params;

    const dish = await dishService.getDish(idDish);
    res.status(201).send({
        status: 1,
        results: dish
    })
}


async function deleteDish(req, res) {
    const { idDish } = req.params;

    const dish = await dishService.deleteDish(idDish);
    res.status(201).send({
        status: 1,
        results: dish
    })
}

async function updateDish(req, res) {
    const infoDish = req.body;
    const { idDish } = req.params;
    const dish = await dishService.updateDish(idDish, infoDish);
    res.status(201).send({
        status: 1,
        results: dish
    })
}


module.exports = {
    getDishes,
    getDish,
    createDish,
    deleteDish,
    updateDish
}