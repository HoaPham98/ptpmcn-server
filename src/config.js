const dotenv = require("dotenv");

dotenv.config();


module.exports = {
    dbURL: process.env.MONGODB_URL,
    jwtKey: process.env.JWT_KEY,
    port: process.env.PORT
};