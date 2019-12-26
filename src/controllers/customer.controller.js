const customerService = require("../services/customer.service");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createCustomer(req, res) {
    const infoCustomer = req.body;
    const customer = await customerService.createCustomer(infoCustomer);

    res.status(201).send({
        status: 1,
        results: customer
    })
}

async function findCustomerByTel(req, res) {
    const { tel } = req.params;
    const customer = await customerService.findCustomerByTel(tel);

    res.status(201).send({
        status: 1,
        results: customer
    })
}

async function updateCustomer(req, res) {
    const infoCustomer = req.body;
    const { tel } = req.params;
    const customer = await customerService.updateCustomer(tel, infoCustomer);

    res.status(201).send({
        status: 1,
        results: customer
    })
}

module.exports = {
    createCustomer,
    updateCustomer,
    findCustomerByTel
}