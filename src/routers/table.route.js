const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const role = require("../models/role.model");

const {
    createTable,
    updateTable,
    deleteTable,
    getTable,
    getTables
} = require('../controllers/table.controller')

router.get("/get/:idTable", asyncMiddleware(getTable));
router.post("/create", auth(role.ROLE_ADMIN), asyncMiddleware(createTable));
router.patch("/update/:idTable", auth(role.ROLE_ADMIN), asyncMiddleware(updateTable));
router.delete("/delete/:idTable", auth(role.ROLE_ADMIN), asyncMiddleware(deleteTable));
router.get("/get-all", asyncMiddleware(getTables));

module.exports = router;

