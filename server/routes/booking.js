
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
    var booking = new Booking(req.body);
    booking.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});




module.exports = router;
