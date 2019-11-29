const mongoose = require('mongoose')

const url = process.env.MONGODB_URL || "mongodb://localhost:27017/test"

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then (console.log("Connected to mongo"))
