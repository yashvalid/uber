const mapService = require("../services/maps.services");
const {validationResult} = require("express-validator")

module.exports.getCoordinates = async (req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()})
    }
    const {address} = req.query;

    try{
        const coordinates = await mapService.getAddressCoord(address);
        return res.status(201).json(coordinates);
    } catch(err){
        return res.status(404).json({message : "Co-ordinate not found"});
    }
}

module.exports.getDistanceTime = async (req,res,next) =>{
    const error = validationResult(req);
    if(!error.isEmpty())
        return res.status(400).json({errors : error.array()});

    const {origin, destination} = req.query;

    try{
        const distance = await mapService.getDistanceTime(origin, destination);
        return res.status(201).json(distance);
    } catch(err){
        return res.status(404).json({message : "something went wrong"});
    }
}

module.exports.getSuggestion = async (req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty())
        return res.status(400).json({errors : error.array()});

    const {address} = req.query;

    try{
        const suggestion = await mapService.getAddressSuggestion(address);
        return res.status(201).json(suggestion);
    } catch(err){
        return res.status(404).json({message : "something went wrong"});
    }
}

