const Bill = require("../models/bill.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const orderService = require("./order.service");
const tableService = require("./table.service");
const preparingDishService = require("../services/preparingDish.service");
const Dish = require("../models/dish.model");
const mongoose = require('mongoose')


async function createBill(idUser, infoBill) {
    const infoNewbill = {
        employee: idUser,
        ...infoBill
    };

    const tables = infoBill.tables;
    let busyTable = "";
    for (let i = 0; i < tables.length; i++) {
        tables[i] = await tableService.getTable(tables[i]);
        if (tables[i].isAvailable === false) {
            busyTable += tables[i].name;
            if (i != tables.length - 1)
                busyTable += ", "
        }
    }
    if (busyTable !== "")
        throw new CustomError(errorCode.BAD_REQUEST, busyTable + " is not available!");
    let newBill = await Bill.create(infoNewbill);

    newBill.tables.forEach(table => {
        table.isAvailable = false;
        table.currentBill = newBill._id
        table.save();
    });

    return newBill;
}

async function updateBill(idBill, infoBill) {
    const keysUpdate = Object.keys(infoBill);
    const keysAllowed = ["orders"];

    const isValidUpdate = keysUpdate.every(key => {
        keysAllowed.includes(key);
    })

    if (!isValidUpdate) {
        throw new CustomError(errorCode.BAD_REQUEST, "Update keys are not valid!");
    }

    const updatedBill = await Bill.findByIdAndUpdate(idBill, infoBill);
    return updatedBill;
}

async function deleteBill(idBill) {
    const deletedBill = await Bill.find({ _id: idBill });

    if (!deletedBill) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to delete!");
    }

    deletedBill.isDeleted = true;
    await deletedBill.save();
    return deletedBill;
}

async function getBillById(idBill) {
    const bill = await Bill.find({ _id: idBill });

    if (bill.length <= 0) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to get!");
    }

    return bill[0];
}

async function completeBill(idBill) {
    let bills = await Bill.find({
        "_id":idBill,
        "status":"checkingOut"
    });

    if (bills.length <= 0) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to get!");
    }

    const bill = bills[0];

    const session = await mongoose.startSession()
    try {
        session.startTransaction();
        bill.status = "finished";
        
        for(let i = 0; i < bill.tables.length; i++){
            console.log(bill);
            bill.tables[i].currentBill = null;
            await bill.tables[i].save();
        }
        await bill.save()
        
        await session.commitTransaction()
        session.endSession();
    } catch (err) {
        throw new CustomError(errorCode.NOT_FOUND, err.message);
    }

    return bill;
}

async function addOrder(idBill, orderInfo) {
    const bill = await Bill.findById(idBill);

    if (!bill)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to add order!");

    let order = await orderService.createOrder(bill.employee, orderInfo);
    bill.orders.push(order._id);
    await bill.save();

    let preparingDish = await preparingDishService.addNewOrder(bill._id, order);

    order.isDeleted = undefined;
    order.status = undefined;
    order.closeDate = undefined;
    order.createdAt = undefined;
    order.updatedAt = undefined;
    order.__v = undefined;

    bill.isFinished = undefined;
    bill.createdAt = undefined;
    bill.updatedAt = undefined;
    bill.__v = undefined;

    await order.populate("employee", "name").execPopulate();
    for (let i = 0; i < order.dishes.length; i++) {
        await order.populate("dishes." + i + ".dish", ['name', "unit"]).execPopulate();
        await order.populate("dishes." + i + ".dish.unit", ["name"]).execPopulate();
    }

    return { bill, order, preparingDish };
}

async function createFinalOrder(idBill) {
    const bill = await Bill.findById(idBill);

    if (!bill)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to get final order!");

    await bill.populate("orders", "dishes").execPopulate();
    for (let i = 0; i < bill.orders.length; i++) {
        for (let j = 0; j < bill.orders[i].dishes.length; j++)
            await bill.populate("orders." + i + ".dishes." + j + ".dish", ["name", "isAvailable"], "Dish").execPopulate();
    }

    let finalOrder = [];
    bill.orders.forEach(order => {
        order.dishes.forEach(dish => {
            let index = finalOrder.findIndex(item => item.dish.toString() === dish.dish._id.toString());
            if (index === -1) {
                finalOrder.push({
                    "dish": dish.dish._id,
                    "quantity": dish.quantity
                });
            }
            else {
                finalOrder[index].quantity += dish.quantity;
            }
        })
    });
    bill.finalOrder = finalOrder;
    await bill.save();
    bill.orders = undefined;
    return bill;
}

async function returnDish(idBill, dish) {
    let bill = await Bill.findById(idBill);

    if (!bill)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to return dish!");


    let temp = bill.finalOrder.find(item => item.dish.toString() === dish.dish.toString()).quantity;
    temp -= dish.quantity;
    if (temp < 0)
        temp = 0
    bill.finalOrder.find(item => item.dish.toString() === dish.dish.toString()).quantity = temp;
    await bill.save();

    return bill;
}

async function checkOut(idBill) {
    let bill = await Bill.findOne({
        "_id":idBill,
        "status":"eating"
    });

    if (!bill)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to return dish!");

    bill.status = "checkingOut"
    const finalOrder = bill.finalOrder;
    const idDishes = finalOrder.map(item => item.dish._id);

    const dishes = await Dish.find({
        "_id": {
            $in: idDishes
        }
    });

    let totalPrice = 0;
    finalOrder.forEach(item => {
        let dishPrice = dishes.find(item2 => item.dish._id.toString() === item2._id.toString()).price;
        totalPrice += dishPrice * item.quantity;
    });
    bill.totalPrice = totalPrice;
    await bill.save();
    return bill;
}

// async function finishBill(idBill, idCustomer) {
//     let bill = await Bill.findOne({
//         "_id": idBill,
//         "isFinished": false
//     });

//     if (bill.length <= 0) {
//         throw new CustomError(errorCode.NOT_FOUND, "Could not find bill to finish!");
//     }

//     bill.customer = idCustomer;
//     bill.isFinished = true;

//     await bill.save();
//     return bill;

// }

module.exports = {
    createBill,
    updateBill,
    deleteBill,
    getBillById,
    completeBill,
    addOrder,
    createFinalOrder,
    returnDish,
    checkOut
}