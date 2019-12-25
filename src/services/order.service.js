const Order = require("../models/order.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createOrder(idUser, infoOrder) {
    const infoNewOrder = {
        closeDate: null,
        employee: idUser,
        ...infoOrder
    }

    const newOrder = await Order.create(infoNewOrder);

    return newOrder;
}

async function getOrder(idOrder) {
    const order = await Order.findById(idOrder);

    if (!order) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not found any orders to get!");
    }

    return order;
}

async function deleteOrder(idOrder) {
    const deletedOrder = await Order.findById(idOrder);

    if (!deletedOrder) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not found any orders to delete!");
    }
    deletedOrder.isDeleted = true;
    await deletedOrder.save();
    return deletedOrder;
}

module.exports = {
    createOrder,
    getOrder,
    deleteOrder
}