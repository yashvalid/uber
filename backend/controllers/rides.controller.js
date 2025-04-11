const {validationResult} = require("express-validator");
const rideService = require("../services/rides.services");
const mapService = require("../services/maps.services");
const { sendMessageToSocketId } = require("../socket");
const Ride = require("../model/rides.model");


module.exports.createRide = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const user = req.user;
        const { pickup, drop, vehicleType } = req.body;

        const ride = await rideService.createRide({
            user,
            pickup,
            drop,
            vehicleType,
        });

        const pickupCoord = await mapService.getAddressCoord(pickup);
        
        const captains = await mapService.getCaptainInTheRadius(
            pickupCoord.lng,
            pickupCoord.ltd, 
            2 
        );

        ride.otp = "";
        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user')
        captains.map(captain =>{
            sendMessageToSocketId(captain.socketId, {
                event : "new-ride",
                data : rideWithUser,
            });
        })
        
        res.status(201).json({ ride, captains });
    } catch (err) {
         
        console.error(err);
        return res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

module.exports.getFares = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors : error.array()});
    }

    const {pickup, drop} = req.query;
    try{
        const fares = await rideService.getFare(pickup, drop);
        return res.status(200).json({fares});
    } catch(err){
        return res.status(404).json({message : err});
    }
    
}

module.exports.confirmRide = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors : error.array()});
    }

    const {rideId} = req.body;
    try{
        const ride = await rideService.confirmRide(rideId, req.captain._id);
        sendMessageToSocketId(ride.user.socketId, {
            event : "ride-confirmed",
            data : ride,
        });
        return res.status(200).json({ride});
    } catch(err){
        console.log(err);
        return res.status(500).json({message : err});
    }
}

module.exports.startRide = async (req, res) => {
    console.log("start ride called")
    const error = validationResult(req);
    if(!error.isEmpty())
        return res.status(400).json({errors : error.array()});

    const {rideId, otp} = req.query;

    try{
        const ride = await rideService.startRide(rideId, otp);
        return res.status(200).json({ride});
    } catch(err){
        return res.status.json({message : err});
    }
}

module.exports.endRide = async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()) 
        return res.status(400).json({ errors: error.array() });
    
    try{
        const { rideId } = req.query;
        const ride = await rideService.endride(rideId, captain = req.captain);
        return res.status(201).json(ride);
    } catch(err){
        return res.status(404).json({message : err});
    }
}