const Area = require("../models/area.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createArea(infoArea) {
    const area = Area.findOne({ name: infoArea.name });

    if (area) {
        throw new CustomError(errorCode.ALREADY_EXIST, "Area's has already existed!");
    }

    const newArea = await Area.create(infoArea);

    return newArea;
}

async function updateArea(idArea, infoArea) {
    const keysUpdate = Object.keys(infoArea);
    const keysAllowed = ["name", "tables"];

    const isValidUpdate = keysUpdate.every(key => {
        keysAllowed.includes(key);
    })

    if (!isValidUpdate) {
        throw new CustomError(errorCode.BAD_REQUEST, "Update keys are not valid!");
    }

    const updatedArea = await Area.findByIdAndUpdate(idArea, infoArea);
    return updatedArea;
}

async function deleteArea(idArea) {
    const area = await Area.findById(idArea);
    if (!area)
        throw new CustomError(errorCode.NOT_FOUND, "Area's name does not exist!");

    const deletedArea = await Area.findOneAndDelete(idArea);
    return deletedArea
}

async function getArea(idArea) {
    const area = await Area.findById(idArea);
    await area.populate("tables");
    return area;
}

module.exports = {
    createArea,
    updateArea,
    deleteArea,
    getArea
}
