const router = require("express").Router();
const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const {
    createArea,
    updateArea,
    deleteArea,
    getArea
} = require("../controllers/area.controller");

router.post("/create", auth, asyncMiddleware(createArea));
router.get("/get/:idArea", auth, asyncMiddleware(getArea));
router.patch("/update/:idArea", auth, asyncMiddleware(updateArea));
router.delete("/delete/:idArea", auth, asyncMiddleware(deleteArea));

module.exports = router;