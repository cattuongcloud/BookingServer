require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const index = require("./routes/index");
const user = require("./routes/user");
const todo = require("./routes/todo");
const booking = require("./routes/booking");
const driversLocation = require("./routes/driversLocation");
var path = require("path");
var socket_io = require("socket.io");

var io = socket_io();

const port = process.env.PORT;
var app = express();

app.set("views",  path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// user API
app.use("/", index);
app.use("/api", user);
app.use("/api", todo);
app.use("/api", booking);
app.use("/api", driversLocation);

// app.listen(port, () => {
//   console.log(`Started up at port ${port}`);
// });

io.listen(app.listen(port, function(){
	console.log("Server running on port", port);
}));

app.io = io.on("connection", function(socket){
	console.log("Socket connected: " + socket.id);
});

module.exports = {app};
