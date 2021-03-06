const Order = require("../models/order.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const Dish = require("../models/dish.model");

async function createOrder(idUser, infoOrder) {

    const infoNewOrder = {
        closeDate: null,
        employee: idUser,
        ...infoOrder
    }
    const idDishes = infoNewOrder.dishes.map(item => item.dish);
    const dishes = await Dish.find({
        "_id": {
            $in: idDishes
        }
    });

    for (let i = 0; i < infoNewOrder.dishes.length; i++) {
        const dish = dishes.find(item => item._id.toString() === infoNewOrder.dishes[i].dish.toString());
        infoNewOrder.dishes[i].canFinish = dish.isAvailable;
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

async function finishDish(idOrder, idDish) {
    const order = await Order.findById(idOrder);

    if (!order) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not found any orders to finish a dish!");
    }

    if (order.dishes.find(item => item.dish.toString() === idDish.toString()).isDone === true) {
        throw new CustomError(errorCode.BAD_REQUEST, "This dish is already finished!");
    }

    if (order.dishes.find(item => item.dish.toString() === idDish.toString()).canFinish === true)
        order.dishes.find(item => item.dish.toString() === idDish.toString()).isDone = true;
    else
        throw new CustomError(errorCode.BAD_REQUEST, "This dish is still being prepared!");

    await order.save();
    return order;
}



module.exports = {
    createOrder,
    getOrder,
    deleteOrder,
    finishDish
}