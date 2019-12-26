const router = require('express').Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const auth = require('../middlewares/auth');
const role = require("../models/role.model");

const {
    createUser,
    logIn,
    getCurrentUser,
    logOut,
    logOutAll
} = require("../controllers/user.controller");

router.post('/register', auth([role.ROLE_ADMIN]), asyncMiddleware(createUser));
router.post('/login', asyncMiddleware(logIn));
router.get('/users/me', auth, asyncMiddleware(getCurrentUser));
router.post('/users/me/logout', auth, asyncMiddleware(logOut))
router.post('/users/me/logoutall', auth, asyncMiddleware(logOutAll))

module.exports = router;