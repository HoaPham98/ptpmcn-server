const router = require("express").Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const role = require("../models/role.model");

const {
    createBill,
    updateBill,
    getBill,
    deleteBill
} = require("../controllers/bill.controller");

router.get("/get/:idBill", auth([role.ROLE_ADMIN, role.ROLE_WAITER]), asyncMiddleware(getBill));
router.post("/create", auth([role.ROLE_WAITER]), asyncMiddleware(createBill));
router.patch("/update/idBill", auth([role.ROLE_WAITER]), asyncMiddleware(updateBill));
router.delete("/delete/idbill", auth([role.ROLE_ADMIN, role.ROLE_WAITER], asyncMiddleware(deleteBill)));

module.exports = router;