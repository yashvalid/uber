const Ride = require("../model/rides.model");
const mapService = require("../services/maps.services");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 26,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 8,
        car: 14,
        moto: 6
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };


    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

module.exports.getFare = getFare;

function getOTP(num){
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, drop, vehicleType }) => {
    if(!user || !pickup || !drop || !vehicleType) {
        throw new Error("All fields are required");
    }
    try{
        const fare = await getFare(pickup, drop);
        const otp = getOTP(4);
        const ride = await Ride.create({
            user,
            pickup,
            drop,
            otp,
            fare : fare[vehicleType]
        });
        
        return ride;
    } catch(err){
        return res.status(404).json({message: err});
    }
}

module.exports.confirmRide = async (rideId, captainId) => {
    if(!rideId || !captainId) {
        throw new Error("All fields are required");
    }
    try{
        const rideModel = await Ride.findByIdAndUpdate(rideId, {
            captain : captainId,
            status : "accepted"
        });
        const ride = await Ride.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
        return ride;
        
    } catch(err){
        console.log(err);
    }
}

module.exports.startRide = async (rideId, otp) => {
    if(!rideId || !otp) {
        throw new Error("All fields are required");
    }

    try{
        const rideModel = await Ride.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
        if(!rideModel)
            throw new Error("Ride not found");

        if(rideModel.otp !== otp)
            throw new Error("Invalid OTP");

        if(rideModel.status !== "accepted")
            throw new Error("Ride already started or completed");

        const ride = await Ride.findOneAndUpdate({_id: rideId}, {status : "on-going"}, {new : true});
        sendMessageToSocketId(rideModel.user.socketId, {
            event : "ride-started",
            data : rideModel,
        });
        return rideModel;
    } catch(err){
        console.log(err);
    }
}

module.exports.endride = async (rideId, captain) => {
    try{
        const rideModel = await Ride.findOne({_id: rideId, captain : captain._id}).populate('user').populate('captain').select('+otp');
        if(!rideModel)
            throw new Error("Ride not found");

        if(rideModel.status !== "on-going")
            throw new Error("Ride not started");

        const ride = await Ride.findOneAndUpdate({_id : rideId}, {status : "completed"});
        sendMessageToSocketId(rideModel.user.socketId, {
            event : "ride-completed",
            data : rideModel,
        });
    } catch(err){
        console.log(err);
    }
}