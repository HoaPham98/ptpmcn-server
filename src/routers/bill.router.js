const router = require("express").Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const role = require("../models/role.model");

const {
    createBill,
    updateBill,
    getBill,
    deleteBill,
    completeBill,
    addOrder,
    createFinalOrder,
    returnDish,
    checkOut,
    getLastestPendingBill
} = require("../controllers/bill.controller");

router.get("/get/:idBill", auth([role.ROLE_ADMIN, role.ROLE_WAITER, role.ROLE_CASHIER]), asyncMiddleware(getBill));
router.post("/create", auth([role.ROLE_WAITER]), asyncMiddleware(createBill));
router.patch("/update/:idBill", auth([role.ROLE_WAITER]), asyncMiddleware(updateBill));
router.delete("/delete/:idbill", auth([role.ROLE_ADMIN, role.ROLE_WAITER], asyncMiddleware(deleteBill)));
router.post("/complete/:idBill", auth([role.ROLE_CASHIER]), asyncMiddleware(completeBill));
router.post("/addOrder/:idBill", auth([role.ROLE_WAITER]), asyncMiddleware(addOrder));
router.get("/createFinalOrder/:idBill", auth([role.ROLE_WAITER]), asyncMiddleware(createFinalOrder));
router.patch("/returnDish/:idBill", auth([role.ROLE_WAITER]), asyncMiddleware(returnDish));
router.patch("/checkOut/:idBill", auth([role.ROLE_WAITER]), asyncMiddleware(checkOut));
router.get("/getLastestPending", asyncMiddleware(getLastestPendingBill));

module.exports = router;