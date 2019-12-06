const mongoose = require('mongoose')
const config = require("../config");

const url = config.dbURL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(console.log("Connected to mongo successfully"))
