const orderService = require("../services/order.service");
const validator = require("validator");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createNewOrder(req, res) {
    const infoOrder = req.body;
    const idUser = req.user._id;
    const newOrder = await orderService.createNewOrder(idUser, infoOrder);
    res.status(201).send({
        status: 1,
        results: newOrder
    });
}