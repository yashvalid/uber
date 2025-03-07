const User = require("../model/user");
const userServices = require("../services/user.services");
const {validationResult} = require("express-validator");

module.exports.userRegister = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors : errors.array()});
    
    const {fullname, email, password} = req.body;
    const hassPass = await User.hassPassword(password);

    const user = await userServices.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hassPass,
    })

    const token = user.generateAuthToken();
    return res.json({token, user});
}