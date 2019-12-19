const mongoose = require('mongoose')
const config = require("../config");

const url = config.dbURL;

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(console.log("Connected to mongo successfully"))
