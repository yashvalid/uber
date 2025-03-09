const BlacklistToken = require("../model/blacklistToken.model");
const User = require("../model/user");
const userServices = require("../services/user.services");
const {validationResult} = require("express-validator");

module.exports.userRegister = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors : errors.array()});
    
    const {fullname, email, password} = req.body;
    
    const isUserExist = await User.findOne({email});
    if(isUserExist)
        return res.status(400).json({message : "user already exist"});

    const hassPass = await User.hassPassword(password);

    const user = await userServices.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hassPass,
    })

    const token = user.generateAuthToken();
    return res.status(201).json({token, user});
}

module.exports.userLogin = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors : errors.array()});

    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user)
        return res.status(401).json({message : "Invalid email or password"});

    const isMatch = await user.comparePassword(password);

    if(!isMatch)
        return res.status(401).json({message : "Invalid email or password"});

    const token = user.generateAuthToken();
    res.cookie("token", token);
    return res.status(201).json({token, user});
}

module.exports.userProfile = async(req, res, next)=>{
    return res.status(200).json(req.user);
}

module.exports.userLogout = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({token});
    res.clearCookie("token");
    return res.status(200).json({message : "logout success"});
}