const PreparingDish = require("../models/preparingDish.model");
const Bill = require("../models/bill.model");
const Order = require("../models/order.model");
const Dish = require("../models/dish.model");
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
    let idDishesCanBeInstanlyAdded = preparingDishes.filter(item => (item.status === "pending" || item.status === "preparing" && (Date.now() - item.startAt < item.dish.availableTime))).map(item => item.dish._id);

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

    let nameDish = await Dish.findById(preparingDish.dish);
    nameDish = nameDish.name;
    let message = "Món \"" + nameDish + "\" cho ";
    const idBills = preparingDish.bills;
    const bills = await Bill.find({
        "_id": {
            $in: idBills
        }
    }).populate("tables");

    for (let j = 0; j < bills.length; j++) {
        for (let i = 0; i < bills[j].tables.length; i++) {
            message += bills[j].tables[i].name;
            if (i < bills[j].tables.length - 1) {
                message += ", ";
            }
        }
        if (j < bills.length - 1) {
            message += ", ";
        }
        else
            message += " ";
    }
    message += "đã xong!";

    console.log(message)

    // TODO: THAY HELLO CON DÊ BẰNG MESSAGE CẦN HIỆN
    require('../controllers/io.controller').io().of('/waiter').emit('done', message)
    return preparingDish;
}

async function getListPreparing() {
    let list = await PreparingDish.find({ status: { $ne: "finished" } })
    return list
}

module.exports = {
    addNewOrder,
    startPreparingDish,
    finishPreparingDish,
    getListPreparing
}