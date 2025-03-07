const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [2, "First name must be 2 character long"],
        },
        lastname : {
            type : String,
            minlength : [2, "last name must be 2 character long"]
        },
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [5, "email must be 5 character long"],
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketId : {
        type : String,
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.secretjwt);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.statics.hassPassword = async function(password){
    return bcrypt.hash(password, 10);
}

const User = mongoose.model("user", userSchema);

module.exports = User;