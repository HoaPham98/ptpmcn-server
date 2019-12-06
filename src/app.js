require('./db/db');
const errorHandler = require("./middlewares/errorHandler");
const express = require('express');
const config = require("./config");
const port = config.port;


const app = express();

// Pre-route Middlewares
app.use(express.json());

// Routes go here
app.use("/user", require('./routers/user'));

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})