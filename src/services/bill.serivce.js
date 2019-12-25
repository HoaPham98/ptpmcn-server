const Bill = require("../models/bill.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");
const orderService = require("./order.service");
const tableService = require("./table.service");


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
    const deletedBill = await Bill.findById(idBill);

    if (!deletedBill) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to delete!");
    }

    deletedBill.isDeleted = true;
    await deletedBill.save();
    return deletedBill;
}

async function getBillById(idBill) {
    const bill = await Bill.findById(idBill);

    if (!bill) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to get!");
    }

    return bill;
}

async function completeBill(idBill) {
    const bill = await Bill.findById(idBill);

    if (!bill) {
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to get!");
    }

    bill.isFinished = true;
    await bill.save();

    return bill;
}

async function addOrder(idBill, orderInfo) {
    const bill = await Bill.findById(idBill);

    if (!bill)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find any bills to add order!");

    let order = await orderService.createOrder(bill.employee, orderInfo);
    bill.orders.push(order._id);
    await bill.save();

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
        await order.populate("dishes." + i + ".dish", 'name').execPopulate();
    }
    return { bill, order };
}

module.exports = {
    createBill,
    updateBill,
    deleteBill,
    getBillById,
    completeBill,
    addOrder
}