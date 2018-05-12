
var express = require("express");
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { Booking } = require('../models/booking');
//var { authenticate } = require('../middleware/authenticate');
const _ = require('lodash');
router.get("/bookings", function(req, res, next){
	Booking.find(function(err, bookings){
		if(err){
			res.send(err);

		}
		res.json(bookings);
	})
}); 

router.post('/booking', (req, res) => {
    var nearByDriver = req.body.nearByDriver;
	var io = req.app.io;
    var booking = new Booking(req.body.data);
    booking.save().then((doc) => {
        res.send(doc);
        if(nearByDriver.socketId){
            io.emit(nearByDriver.socketId + "driverRequest", doc);
        }else{
            console.log("Driver not connected");
        }
    }, (e) => {
        res.status(400).send(e);
    });
});

// Driver  Update Booking done on driver side
router.put("/bookings/:id", function(req, res, next){
    var io = req.app.io;
    var booking = req.body;
    if (!booking.status){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        Booking.findByIdAndUpdate({_id: req.params.id},{ $set: { 
        	driverId: booking.driverId,
        	status: booking.status 
        }}, function(err, updatedBooking){
        if (err){
            res.send(err);
        }
        if (updatedBooking){
            //Get Confirmed booking
            Booking.findOne({_id:  req.params.id},function(error, confirmedBooking){
                if (error){
                    res.send(error);
                }
                res.send(confirmedBooking);
                io.emit("action", {
                    type:"BOOKING_CONFIRMED",
                    payload:confirmedBooking
                });
            });
        }
    });
    }
});





module.exports = router;
