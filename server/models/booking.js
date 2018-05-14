const mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,   
  },
  pickUp: {
    type: Object,
    required: true, 
  },
  dropOff: {
    address: String,
    name:  String,
    latitude: String,
    longitude: String
  },
  fare: Number,
  status: String,
  driverId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  } 
  
});

var Booking = mongoose.model('Booking', BookingSchema);
module.exports = {Booking}
