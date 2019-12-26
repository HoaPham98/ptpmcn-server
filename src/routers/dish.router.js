const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const role = require("../models/role.model");

const {
    getDishes
} = require('../controllers/dish.controller')

router.get("/get-all", asyncMiddleware(getDishes));

module.exports = router;