const userService = require("../services/user.service");

async function createUser(req, res) {
    const userInfo = req.body;
    // Create a new user
    const { token, newUser } = await userService.createUser(userInfo);
    res.status(201).send({
        status: 1,
        results: {
            token,
            newUser
        }
    });
}

async function logIn(req, res) {
    console.log(req.body)
    const { email, password } = req.body;

    const { token, user } = await userService.logIn(email, password);

    res.send({
        status: 1,
        results: {
            token,
            role: user.role
        }
    });
}

async function getCurrentUser(req, res) {
    const user = req.user;
    res.send({
        status: 1,
        results: user
    });
}

async function logOut(req, res) {
    const user = req.user;
    const token = req.token;
    await userService.logOut(user, token);

    res.status(201).send({
        status: 1,
        results: user
    })
}

async function logOutAll(req, res) {
    const user = req.user;
    await userService.logOutAll(user);

    res.status(201).send({
        status: 1,
        results: user
    });
}

async function updateUser(req, res) {
    await userService.updateUser(req.user, req.body);
    res.send({
        status: 1,
        results: req.user
    });
}

module.exports = {
    createUser,
    logIn,
    getCurrentUser,
    logOut,
    logOutAll,
    updateUser
}