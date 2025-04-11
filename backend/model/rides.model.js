const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
        
    },
    pickup: {
        type: String,
        required: true
    }, 
    drop: {
        type: String,
        required: true
    },
    fare : {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled', 'on-going', 'rejected'],
        default: 'pending'
    },
    duration : {
        type: String,
    },
    distance : {
        type: String,
    },
    paymentID : {
        type: String,
    },
    orderID : {
        type: String,
    },
    otp : {
        type : String,
        select : false,
        required : true
    }
});


const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;