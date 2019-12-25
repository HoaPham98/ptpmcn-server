const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const role = require("../models/role.model");
const {
    startPreparingDish,
    finishPreparingDish
} = require("../controllers/preparingDish.controller");

router.patch("/start/:idDish", auth([role.ROLE_CHEF]), asyncMiddleware(startPreparingDish));
router.patch("/finish/:idDish", auth([role.ROLE_CHEF]), asyncMiddleware(finishPreparingDish));

module.exports = router;