const preparingDishService = require("../services/preparingDish.service");
const validator = require("validator");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function startPreparingDish(req, res) {
    const { idDish } = req.params;
    const dish = await preparingDishService.startPreparingDish(idDish);

    res.status(201).send({
        status: 1,
        results: dish
    });
}


async function finishPreparingDish(req, res) {
    const { idDish } = req.params;
    const dish = await preparingDishService.finishPreparingDish(idDish);
    res.status(201).send({
        status: 1,
        results: dish
    });
}

async function getPreparingDish(req, res) {
    const dishes = await preparingDishService.getListPreparing();

    res.status(201).send({
        status: 1,
        results: dishes
    })
}

module.exports = {
    startPreparingDish,
    finishPreparingDish,
    getPreparingDish
}