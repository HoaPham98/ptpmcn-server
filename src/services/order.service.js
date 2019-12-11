const Order = require("../models/order.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createNewOrder(idUser, infoOrder){
    const infoNewOrder = {
        openDate: Date.now,
        closeDate: null,
        users: idUser,
        ...infoOrder
    }

    const newOrder = await Order.create(infoNewOrder);
    newOrder.populate()
}

module.exports = {
    createNewOrder
}