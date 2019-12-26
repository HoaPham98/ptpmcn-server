const PreparingDish = require("../models/preparingDish.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function addNewOrder(idBill, order) {
    let newPreparingList = [];
    // Danh sach cac mon an trong order dang can phai them
    let dishesInNewOrder = order.dishes.filter(item => item.canFinish === false).map(item => {
        return {
            "idDish": item.dish,
            "quantity": item.quantity
        }
    });

    // Danh sach cac id cua cac mon an trong order dang can phai them
    let idDishesInNewOrder = dishesInNewOrder.map(item => item.idDish);

    // Danh sach cac mon an dang trong man hinh nha bep co id trong order
    let preparingDishes = await PreparingDish.find({
        "dish": {
            $in: idDishesInNewOrder
        }
    }).populate("dish", "availableTime", "Dish");

    // danh sach id cac mon co the them vao ngay duoc
    let idDishesCanBeInstanlyAdded = preparingDishes.filter(item => (item.status === "pending" || Date.now() - item.startAt < item.dish.availableTime)).map(item => item.dish._id);

    // danh sach cac mon co the them vao ngay duoc
    let listDishesCanBeInstanlyAdded = preparingDishes.filter(item => {
        let index = idDishesCanBeInstanlyAdded.findIndex(temp => temp.toString() == item.dish._id.toString());
        if (index === -1)
            return false;
        return true;
    });

    // them cac mon vao ngay duoc
    for (let i = 0; i < listDishesCanBeInstanlyAdded.length; i++) {

        let addedDish = dishesInNewOrder.find(item => item.idDish.toString() === listDishesCanBeInstanlyAdded[i].dish._id.toString());

        listDishesCanBeInstanlyAdded[i].quantity += addedDish.quantity;
        if (!listDishesCanBeInstanlyAdded[i].bills.includes(idBill))
            listDishesCanBeInstanlyAdded[i].bills.push(idBill);
        if (!listDishesCanBeInstanlyAdded[i].orders.includes(order._id))
            listDishesCanBeInstanlyAdded[i].orders.push(order._id);

        await listDishesCanBeInstanlyAdded[i].save();
        newPreparingList.push(listDishesCanBeInstanlyAdded[i]);
    }

    // danh sach cac mon can them moi
    let newPerparingDishes = dishesInNewOrder.filter(item => {
        let index = idDishesCanBeInstanlyAdded.findIndex(temp => temp.toString() == item.idDish.toString());
        if (index === -1)
            return true;
        return false;
    });

    // tao cac mon moi trong preparing dish
    for (let i = 0; i < newPerparingDishes.length; i++) {
        let temp = await createPreparingDish({
            "dish": newPerparingDishes[i].idDish,
            "quantity": newPerparingDishes[i].quantity,
            "bills": [idBill],
            "orders": [order._id],
            "status": "pending"
        });
        newPreparingList.push(temp);
    }
    return newPreparingList;
}


async function createPreparingDish(preparingDishInfo) {
    let dish = await PreparingDish.create({
        ...preparingDishInfo
    });
    return dish;
}

async function startPreparingDish(idPreparingDish) {
    let dish = await PreparingDish.findById(idPreparingDish);

    if (dish.status === "preparing" || dish.status === "finished")
        throw new CustomError(errorCode.BAD_REQUEST, "Could not start! This dish is " + dish.status + "!");
    dish.startAt = Date.now();
    dish.status = "preparing";
    await dish.save();
    return dish;
}

async function finishPreparingDish(idPreparingDish) {
    let preparingDish = await PreparingDish.findById(idPreparingDish);

    if (preparingDish.status === "finished" || preparingDish.status === "pending")
        throw new CustomError(errorCode.BAD_REQUEST, "Could not finish! This dish is " + preparingDish.status + "!");
    await preparingDish.populate("orders", "dishes").execPopulate();
    for (let i = 0; i < preparingDish.orders.length; i++) {
        preparingDish.orders[i].dishes.find(item => item.dish.toString() === preparingDish.dish.toString()).canFinish = true;
        await preparingDish.orders[i].save();
    }
    preparingDish.status = "finished";
    await preparingDish.save();
    return preparingDish;
}

module.exports = {
    addNewOrder,
    startPreparingDish,
    finishPreparingDish
}