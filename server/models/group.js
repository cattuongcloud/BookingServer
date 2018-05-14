const mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  permission: {
    type: Object    
  }       
});

var Group = mongoose.model('group', groupSchema);
module.exports = { Group }
