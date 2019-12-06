const User = require("../models/User.model");
const CustomError = require("../errors/CustomError");
const errorCode = require("../errors/errorCode");

async function createUser(userInfo) {
    const currentUser = await User.findOne({ email: userInfo.email });

    if (currentUser) {
        throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, "Could not create new user! Email is already registered!");
    }

    const newUser = await User.create(userInfo);
    const token = await user.generateAuthToken();

    return { token, newUser };
}

async function logIn(email, password) {
    const user = await User.findByCredentials(email, password);

    if (!user) {
        throw new CustomError(errorCode.UNAUTHORIZED, "Login failed! Check authentication credentials");
    }

    const token = user.generateAuthToken();

    return { token, user };
}

async function logOut(user, currentToken) {
    user.tokens = user.tokens.filter(({ token }) => token !== currentToken);
    await user.save();
}

async function logOutAll(user) {
    user.tokens = [];
    await user.save();
}

async function updateUser(user, updatedInfo) {
    const updates = Object.keys(updatedInfo);
    const allowUpdate = ["name", "dateOfBirth", "tel"];
    const isValidUpdateInfo = updates.every(update =>
        allowUpdate.includes(update)
    );

    if (!isValidUpdateInfo) {
        throw new CustomError(errorCode.BAD_REQUEST, "Updated info is not valid!");
    }

    updates.forEach(update => {
        user[update] = updatedInfo[update];
    });

    await user.save();
}

module.exports = {
    createUser,
    logIn,
    logOut,
    logOutAll,
    updateUser
}