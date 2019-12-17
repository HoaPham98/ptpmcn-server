require('./db/db');
const errorHandler = require("./middlewares/errorHandler");
const express = require('express');
const config = require("./config");
const port = config.port;


const app = express();

// Pre-route Middlewares
app.use(express.json());

// Routes go here
app.use("/user", require('./routers/user.route'));
app.use("/table", require("./routers/table.route"));
app.use("/area", require("./routers/area.router"));
app.use("/bill", require("./routers/bill.router"));

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})