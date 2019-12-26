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
app.use('/dish', require('./routers/dish.router'));
app.use('/customer', require('./routers/customer.router'));

app.use('/test', require('./routers/test.router'))

// Error handler
app.use(errorHandler);

var server = require("http").Server(app);
var io = require('./controllers/io.controller').initialize(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})