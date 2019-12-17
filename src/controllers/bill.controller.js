const billService = require("../services/bill.serivce");
const Bill = require("../models/bill.model");
const validator = require("validator");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createBill(req, res) {
    const infoBill = req.body;
    const user = req.user;
    const newBill = await billService.createBill(user._id, infoBill);

    res.status(201).send({
        status: 1,
        results: newBill
    });
}

async function updateBill(req, res) {
    const { idBill } = req.params;
    const infoBill = req.body;

    if (!validator.isMongoId(idBill)) {
        throw new CustomError(errorCode.BAD_REQUEST, "This idBill is not MongoDB ID");
    }

    const updatedBill = await billService.updateBill(idBill, infoBill);

    res.status(201).send({
        status: 1,
        results: updatedBill
    });
}

async function getBill(req, res) {
    const { idBill } = req.params;

    if (!validator.isMongoId(idBill)) {
        throw new CustomError(errorCode.BAD_REQUEST, "This idBill is not MongoDB ID");
    }

    const bill = await billService.getBillById(idBill);

    res.status(201).send({
        status: 1,
        results: bill
    });
}

async function deleteBill(req, res) {
    const { idBill } = req.params;

    if (!validator.isMongoId(idBill)) {
        throw new CustomError(errorCode.BAD_REQUEST, "This idBill is not MongoDB ID");
    }

    const deletedBill = await billService.deleteBill(idBill);

    res.status(201).send({
        status: 1,
        results: deletedBill
    });
}

module.exports = {
    createBill,
    updateBill,
    getBill,
    deleteBill
}