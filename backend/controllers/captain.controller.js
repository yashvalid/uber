const BlacklistToken = require('../model/blacklistToken.model');
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
    return res.status(201).json({token, captain});
}

module.exports.captainLogin = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors : errors.array()});

    const {email, password} = req.body;

    const captain = await Captain.findOne({email}).select("+password");

    if(!captain)
        return res.status(401).json({message : "Invalid email or password"});

    const isMatch = await captain.comparePassword(password);

    if(!isMatch)
        return res.status(401).json({message : "Invalid email or password"});

    const token = captain.generateAuthToken();
    res.clearCookie("token");
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({token, captain});
}

module.exports.captainProfile = async(req, res)=>{
    return res.status(200).json({captain : req.captain});
}

module.exports.captainLogout = async(req, res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({token});
    res.clearCookie("token");
    return res.status(200).json({message : "logout success"});
}

module.exports.confirmedCaptain = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(400).json({errors : errors.array()});

    const {id} = req.params;
    try{
        const captain = await Captain.findById(id);
        if(!captain)
            return res.status(400).json({message : "captain not found"});
        return res.status(201).json({captain : captain});
    } catch(err){
        res.status(500).json({message : "server error"});
    }
}
