const User = require("../model/user");  
const Captain = require("../model/captain.model"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlacklistToken = require("../model/blacklistToken.model");

module.exports.authUser = async (req, res, next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) 
        return res.status(401).json({message : "unauthorized"});

    const isBlacklisted = await BlacklistToken.findOne({token : token});

    if(isBlacklisted)
        return res.status(401).json({message : "unauthorized"});

    try{
        const decoded = jwt.verify(token, process.env.secretjwt);
        const user = await User.findById(decoded._id);
        if(!user)
            return res.status(401).json({message : "unauthorized"});
        req.user = user;

        next();
    } catch(err){
        return res.status(401).json({message : "unauthorized"});
    }
}

module.exports.authCaptain = async (req, res, next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({message : "unauthorized"});

    const isBlacklisted = await BlacklistToken.findOne({token : token});
    if(isBlacklisted)
        return res.status(401).json({message : "unauthorized"});

    try{
        const decoded = jwt.verify(token, process.env.secretjwt);
        const captain = await Captain.findById(decoded._id);
        if(!captain)
            return res.status(401).json({message : "unauthorized"});
        req.captain = captain;

        next();
    } catch(err){
        return res.status(401).json({message : "unauthorized"});
    }   
}