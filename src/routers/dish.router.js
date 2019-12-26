const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const role = require("../models/role.model");

const {
    getDishes,
    getDish,
    createDish,
    deleteDish,
    updateDish
} = require('../controllers/dish.controller')

router.get("/get-all", asyncMiddleware(getDishes));
router.get("/get/:idDish", auth([role.ROLE_ADMIN]), asyncMiddleware(getDish));
router.post("/create", auth([role.ROLE_ADMIN]), asyncMiddleware(createDish));
router.delete("/delete/:idDish", auth([role.ROLE_ADMIN]), asyncMiddleware(deleteDish));
router.patch("/update/:idDish", auth([role.ROLE_ADMIN]), asyncMiddleware(updateDish));

module.exports = router;