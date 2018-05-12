var express = require("express");
var router = express.Router();
var { mongoose } = require('../db/mongoose');
var { DriversLocation } = require('../models/driversLocation');
//var { authenticate } = require('../middleware/authenticate');
var { Booking } = require('../models/booking');
const _ = require('lodash');
//upadate driver socket id

router.put("/driverLocationSocket/:id", function(req, res, next){

	var io = req.app.io;
	if(!req.body){
		res.status(400);
		res.json({
			"error":"Bad data"
		});

	}else{
		DriversLocation.update({_id: req.params.id}, 
			{$set: {socketId:req.body.socketId}}, function(err, updateDetails){
				if(err){
					res.send(err);

				}else{
					res.send(updateDetails);
				}
		});
	}
});

router.post('/driverLocation', (req, res) => {    
    var driversLocation = new DriversLocation(req.body);
    driversLocation.save().then((doc) => {
        res.send(doc);        
    }, (e) => {
        res.status(400).send(e);
    });
});


router.get("/alldriverslocations", function(req, res, next){
	DriversLocation.find(function(err, data){
		if(err){
			res.send(err);

		}
		res.json(data);
	})
}); 


//get nearby driver
router.get("/driverLocation", function(req, res, next){	
	DriversLocation.find({ 
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
					},
					"$maxDistance":100000
				}
			}
		}, function(err, location){
			if(err){
				res.send(err);

			}else{
				res.send(location);
			}
	});

});

//Get Single Driver and emit track by user to driver
router.get("/driverLocation/:id", function(req, res, next){
	var io = req.app.io;
    DriversLocation.findOne({driverId: req.params.id},function(err, location){
        if (err){
            res.send(err);
        }
        res.send(location);
        io.emit("trackDriver", location);
    });
});

//Update Location by driver to user
router.put("/driverLocation/:id", function(req, res, next){
    var io = req.app.io;
    var location = req.body;
    var latitude = parseFloat(location.latitude);
    var longitude = parseFloat(location.longitude);
    if (!location){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        DriversLocation.update({_id: req.params.id},{ $set: {
        	socketId:location.socketId,
        	coordinate:{
                "type": "Point",
        		coordinates:[
                    longitude,
        			latitude
    			]
    		}
    	}}, function(err, updateDetails){
        if (err){
            console.log(updateDetails);
            res.send(err);
        }
        if (updateDetails){

            //Get updated location
            DriversLocation.findOne({_id:  req.params.id},function(error, updatedLocation){
                if (error){
                    res.send(error);
                }
                res.send(updatedLocation);
                io.emit("action", {
                    type:"UPDATE_DRIVER_LOCATION",
                    payload:updatedLocation
                });
            });
        }
    });
    }
});

module.exports = router;
