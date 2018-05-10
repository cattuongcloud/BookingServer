require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const user = require("./routes/user");
const todo = require("./routes/todo");
const booking = require("./routes/booking");
const port = process.env.PORT;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// user API
app.use("/api", user);
app.use("/api", todo);
app.use("/api", booking);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
