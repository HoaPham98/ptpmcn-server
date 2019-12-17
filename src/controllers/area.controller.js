const areaService = require("../services/area.service");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const validator = require("validator");

async function createArea(req, res) {
    const infoArea = req.body;
    const newArea = await areaService.createArea(infoArea);

    res.status(201).send({
        status: 1,
        results: newArea
    })
}

async function updateArea(req, res) {
    const infoArea = req.body;
    const { idArea } = req.params;

    if(!validator.isMongoId(idArea)){
        throw new CustomError(errorCode.BAD_REQUEST, "This idArea is not MongoDB ID");
    }

    const updatedArea = await areaService.updateArea(idArea, infoArea);

    res.status(201).send({
        status: 1,
        results: updatedArea
    });
}

async function deleteArea(req, res) {
    const { idArea } = req.params;

    if(!validator.isMongoId(idArea)){
        throw new CustomError(errorCode.BAD_REQUEST, "This idArea is not MongoDB ID");
    }

    const deletedArea = await areaService.deleteArea(idArea);

    res.status(201).send({
        status: 1,
        results: deletedArea
    });
}

async function getArea(req, res) {
    const { idArea } = req.params;

    if(!validator.isMongoId(idArea)){
        throw new CustomError(errorCode.BAD_REQUEST, "This idArea is not MongoDB ID");
    }

    const area = await areaService.getArea(idArea);

    res.status(201).send({
        status: 1,
        results: area
    })
}

module.exports = {
    createArea,
    updateArea,
    deleteArea,
    getArea
}