const tableService = require("../services/table.service");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const validator = require("validator");

async function createTable(req, res) {
    const infoTable = req.body;
    const newTable = await tableService.createTable(infoTable);
    res.status(201).send({
        status: 1,
        results: newTable
    });
}

async function updateTable(req, res) {
    const infoTable = req.body;
    const { idTable } = req.params;

    if(!validator.isMongoId(idArea)){
        throw new CustomError(errorCode.BAD_REQUEST, "This idTable is not MongoDB ID!");
    }

    const updatedTable = await tableService.updateTable(idTable, infoTable);

    res.status(201).send({
        status: 1,
        results: updatedTable
    });
}

async function deleteTable(req, res) {
    const { idTable } = req.params;
    if(!validator.isMongoId(idTable))
        throw new CustomError(errorCode.BAD_REQUEST, "This idTable is not MongoDB ID!");
    const deletedTable = await tableService.deleteTable(idTable);

    res.status(201).send({
        status: 1,
        results: deletedTable
    });
}

async function getTable(req, res) {
    const { idTable } = req.params;

    if(!validator.isMongoId(idTable))
        throw new CustomError(errorCode.BAD_REQUEST, "This idTable is not MongoDB ID!");
        
    const table = await tableService.getTable(idTable);

    res.status(201).send({
        status: 1,
        results: table
    })
}

async function getTables(req, res) {
    const table = await tableService.getTables();

    res.status(201).send({
        status: 1,
        results: table
    })
}

module.exports = {
    createTable,
    updateTable,
    deleteTable,
    getTable,
    getTables
}