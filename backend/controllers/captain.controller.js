const Captain = require('../model/captain.model');
const captainServices = require('../services/captain.services');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req,res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(400).json({errors : errors.array()});

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainExist = await Captain.findOne({email});
    if(isCaptainExist)
        return res.status(400).json({message : "captain already exist"});

    const hassPass = await Captain.hassPassword(password);

    const captain = await captainServices.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hassPass,
        color : vehicle.color,
        plate : vehicle.plate,      
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    return res.json({token, captain});
}