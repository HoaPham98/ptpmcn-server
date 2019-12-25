const router = require("express").Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const role = require("../models/role.model");
const {
    createOrder,
    deleteOrder,
    getOrder,
    finishDish
} = require("../controllers/order.controller");


router.post("/create", auth(role.ROLE_WAITER), asyncMiddleware(createOrder));
router.delete("/delete/:idOrder", auth(role.ROLE_ADMIN), asyncMiddleware(deleteOrder));
router.get("/get/:idOrder", auth(role.ROLE_CASHIER), asyncMiddleware(getOrder));
router.patch("/finishDish", asyncMiddleware(finishDish));

module.exports = router;