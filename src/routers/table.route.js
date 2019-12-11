const router = require("express").Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require("../middlewares/auth");
const role = require("../models/role.model");

const {
    createTable,
    updateTable,
    deleteTable,
    getTable
}

router.get("/get/:idTable", auth, asyncMiddleware(getTable));
router.post("/create", auth(role.ROLE_ADMIN), asyncMiddleware(createTable));
router.patch("/update/:idTable", auth(role.ROLE_ADMIN), asyncMiddleware(updateTable));
router.delete("/delete/:idTable", auth(role.ROLE_ADMIN), asyncMiddleware(deleteTable));

module.exports = router;

