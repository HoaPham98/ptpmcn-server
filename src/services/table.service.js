const Table = require("../models/table.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createTable(infoTable) {
    const table = await Table.findOne({ name: infoTable.name });

    if (table) {
        throw new CustomError(errorCode.ALREADY_EXIST, "Table's name has already existed");
    }

    const newTable = await Table.create(infoTable);
    return newTable;
}

async function updateTable(idTable, infoTable) {
    // const keysUpdate = Object.keys(infoTable);
    // const keysAllowed = ["name"];

    // const isValidUpdate = keysUpdate.every(key => {
    //     keysAllowed.includes(key);
    // })

    // if (!isValidUpdate)
    //     throw new CustomError(errorCode.BAD_REQUEST, "Update keys are not valid!");
    const updatedTable = await Table.findByIdAndUpdate(idTable, infoTable, { new: true });
    return updatedTable;
}

async function deleteTable(idTable) {
    const deletedTable = await Table.findByIdAndDelete(idTable);

    if (!deletedTable) {
        throw new CustomError(errorCode.NOT_FOUND, "Table does not exist!");
    }

    return deletedTable;
}

async function getTable(idTable) {
    const table = await Table.findById(idTable);

    if (!table)
        throw new CustomError(errorCode.NOT_FOUND, "Table does not exist!");

    return table;
}

async function getTables() {
    const tables = await Table.find();

    if (!tables)
        throw new CustomError(errorCode.NOT_FOUND, "Table does not exist!");

    return tables;
}


module.exports = {
    createTable,
    updateTable,
    deleteTable,
    getTable,
    getTables
}