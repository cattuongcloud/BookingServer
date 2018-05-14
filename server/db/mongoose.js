// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// //mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useMongoClient: true });
// module.exports = { mongoose }

var mongoose = require('mongoose');
var db = "mongodb://tuonghuynh:tuong123@ds111390.mlab.com:11390/taxiapp";
mongoose.Promise = global.Promise;
mongoose.connect(db);

module.exports = {mongoose};
