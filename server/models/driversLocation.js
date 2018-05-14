const mongoose = require('mongoose');

var driversLocationSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },  
  coordinate: {    
    type: Object,  
    coordinates: [Number],   
  },
  socketId: String
});

var DriversLocation = mongoose.model('driversLocation', driversLocationSchema);
module.exports = { DriversLocation }
