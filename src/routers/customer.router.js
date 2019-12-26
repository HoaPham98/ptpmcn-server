const router = require("express").Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const role = require("../models/role.model");

const {
    createCustomer,
    updateCustomer,
    findCustomerByTel
} = require("../controllers/customer.controller");

router.post("/create", auth([role.ROLE_CASHIER]), asyncMiddleware(createCustomer));
router.patch("/update/:tel", auth([role.ROLE_CASHIER]), asyncMiddleware(updateCustomer));
router.get("/find/:tel", auth([role.ROLE_CASHIER]), asyncMiddleware(findCustomerByTel));

module.exports = router;