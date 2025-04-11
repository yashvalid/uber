const express = require("express");
const route = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const {body, query} = require("express-validator");
const rideController = require("../controllers/rides.controller");

route.post("/create-ride",
    
    body('pickup').isString().isLength({min : 3}).withMessage("pickup is required"),
    body('drop').isString().isLength({min : 3}).withMessage("drop is required"),
    body('vehicleType').isString().isLength({min : 3}).withMessage("vehicleType is required"),
    authMiddleware.authUser,
    rideController.createRide
);

route.get("/get-fares",
    query('pickup').isString().isLength({min : 3}).withMessage("pickup is required"),
    query('drop').isString().isLength({min : 3}).withMessage("drop is required"),
    authMiddleware.authUser,
    rideController.getFares
);

route.post("/confirm-ride",
    body('rideId').isString().isLength({min : 3}).withMessage("rideId is required"),
    authMiddleware.authCaptain,
    rideController.confirmRide
)

route.get("/start-ride",
    query('rideId').isString().isLength({min : 3}).withMessage("rideId is required"),
    query('otp').isString().isLength({min : 3}).withMessage("otp is required"),
    authMiddleware.authCaptain,
    rideController.startRide
)

route.post("/end-ride",
    query('rideId').isString().isLength({min : 3}).withMessage("rideId is required"),
    authMiddleware.authCaptain,
    rideController.endRide
)

module.exports = route;