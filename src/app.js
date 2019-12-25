require('./db/db');
const errorHandler = require("./middlewares/errorHandler");
const express = require('express');
const config = require("./config");
const port = config.port;
var cors = require('cors')


const app = express();

app.use(cors())
// Pre-route Middlewares
app.use(express.json());

// Routes go here
app.use("/user", require('./routers/user.route'));
app.use("/table", require("./routers/table.route"));
app.use("/area", require("./routers/area.router"));
app.use("/bill", require("./routers/bill.router"));
app.use("/preparingDish", require("./routers/preparingDish.route"));
app.use("/order", require("./routers/order.router"));

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})