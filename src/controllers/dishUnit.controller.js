const dishUnitService = require("../services/dishUnit.service");

async function createDishUnit(req, res) {
    const infoDishUnit = req.body;

    const dishUnit = await dishUnitService.createDishUnit(infoDishUnit);
    res.status(201).send({
        status: 1,
        results: dishUnit
    })
}

async function getDishUnit(req, res) {
    const { idDishUnit } = req.params;

    const dishUnit = await dishUnitService.getDishUnit(idDishUnit);
    res.status(201).send({
        status: 1,
        results: dishUnit
    })
}


async function deleteDishUnit(req, res) {
    const { idDishUnit } = req.params;

    const dishUnit = await dishUnitService.deleteDishUnit(idDishUnit);
    res.status(201).send({
        status: 1,
        results: dishUnit
    })
}

async function updateDishUnit(req, res) {
    const infoDishUnit = req.body;
    const { idDishUnit } = req.params;
    const dishUnit = await dishUnitService.updateDishUnit(idDishUnit, infoDishUnit);
    res.status(201).send({
        status: 1,
        results: dishUnit
    })
}


module.exports = {
    getDishUnit,
    createDishUnit,
    deleteDishUnit,
    updateDishUnit
}