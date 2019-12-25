const orderService = require("../services/order.service");
const validator = require("validator");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createOrder(req, res) {
    const infoOrder = req.body;
    const idUser = req.user._id;

    const newOrder = await orderService.createOrder(idUser, infoOrder);
    res.status(201).send({
        status: 1,
        results: newOrder
    });
}

async function getOrder(req, res) {
    const { idOrder } = req.params;

    if (!validator.isMongoId(idOrder)) {
        throw new CustomError(errorCode.BAD_REQUEST, "This idOrder is not MongoDB ID");
    }

    const order = await orderService.getOrder(idOrder);
    res.status(201).send({
        status: 1,
        results: order
    });
}

async function deleteOrder(req, res) {
    const { idOrder } = req.params;

    if (!validator.isMongoId(idOrder)) {
        throw new CustomError(errorCode.BAD_REQUEST, "This idOrder is not MongoDB ID");
    }

    const deletedOrder = await orderService.deleteOrder(idOrder);

    res.status(201).send({
        status: 1,
        results: deletedOrder
    });
}

async function finishDish(req, res) {
    const { idOrder, idDish } = req.query;
    if (!validator.isMongoId(idOrder)) {
        throw new CustomError(errorCode.BAD_REQUEST, "This idOrder is not MongoDB ID");
    }

    const order = await orderService.finishDish(idOrder, idDish);
    res.status(201).send({
        status: 1,
        results: order
    })
}

module.exports = {
    createOrder,
    deleteOrder,
    getOrder,
    finishDish
}