const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [2, "First name must be 2 character long"],
        },
        lastname : {
            type : String,
            minlength : [2, "last name must be 2 character long"],
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        match : [/\S+@\S+\.\S+/, "Invalid email"]
    },
    password : {
        type : String,
        required : true,
        select : true,
    },
    socketId : {
        type : String,
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive",
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [3, "Color must be 3 character long"],
        },
        plate : {
            type : String,
            required : true,
            minlength : [3, "Plate must be 3 character long"],
        },
        capacity : {
            type : Number,
            required : true,
            minlength : [1, "Capacity must be 1 character long"],
        },
        vehicleType : {
            type : String,
            enum : ["car", "motorcycle", "auto"],
            required : true,
        }
    },
    location : {
        ltd : {
            type : Number,
        },
        lng : {
            type : Number,
        },
    },
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.secretjwt, {expiresIn : "24h"});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

captainSchema.statics.hassPassword = async function(password){
    return bcrypt.hash(password, 10);
}   


const Captain = mongoose.model("captain", captainSchema);

module.exports = Captain;