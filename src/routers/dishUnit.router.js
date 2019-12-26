const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const role = require("../models/role.model");

const {
    getDishUnit,
    createDishUnit,
    deleteDishUnit,
    updateDishUnit
} = require('../controllers/dishUnit.controller')

router.get("/get/:idDishUnit", auth([role.ROLE_ADMIN]), asyncMiddleware(getDishUnit));
router.post("/create", auth([role.ROLE_ADMIN]), asyncMiddleware(createDishUnit));
router.delete("/delete/:idDishUnit", auth([role.ROLE_ADMIN]), asyncMiddleware(deleteDishUnit));
router.patch("/update/:idDishUnit", auth([role.ROLE_ADMIN]), asyncMiddleware(updateDishUnit));

module.exports = router;