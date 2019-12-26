const Customer = require("../models/customer.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createCustomer(infoCustomer) {
    const customer = await Customer.findOne({
        "tel": infoCustomer.tel
    });

    if (customer) {
        throw new CustomError(errorCode.ALREADY_EXIST, "Could not create Customer. Tel has already existed!");
    }

    const newCustomer = await Customer.create(infoCustomer);

    return newCustomer;
}

async function findCustomerByTel(tel) {
    const customer = await Customer.findOne({
        "tel": tel
    });

    if (!customer)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find this customer! Tel did not exist!");

    return customer;
}

async function updateCustomer(tel, infoCustomer) {
    const customer = await Customer.findOne({
        "tel": tel
    });

    if (!customer)
        throw new CustomError(errorCode.NOT_FOUND, "Could not find this customer! Tel did not exist!");


    const updates = Object.keys(infoCustomer);
    const allowedUpdates = ['name', 'tel', 'address', 'email'];
    const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
        throw new CustomError(errorCode.BAD_REQUEST, 'Invalid updates');
    }

    updates.forEach(update => {
        customer[update] = infoCustomer[update];
    });

    await customer.save();

    return customer;
}

module.exports = {
    createCustomer,
    findCustomerByTel,
    updateCustomer
}