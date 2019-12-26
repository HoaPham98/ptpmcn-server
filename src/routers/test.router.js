const router = require('express').Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require('../middlewares/auth');

router.post('/push-noti', (req, res) => {
    require('../controllers/io.controller').io().of('/waiter').emit('done', "Hello con dê")

    res.send(200)
})

module.exports = router;