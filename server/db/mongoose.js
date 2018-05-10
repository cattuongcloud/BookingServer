// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// //mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true });
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useMongoClient: true });
// module.exports = { mongoose }

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};