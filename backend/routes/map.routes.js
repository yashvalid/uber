const express = require("express");
const route = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const mapsController = require("../controllers/maps.controller");
const {query} = require("express-validator")

route.post("/map-coordinate",
    query('address').isString().isLength({min : 3}).withMessage("address is required"),
    authMiddleware.authUser,
    mapsController.getCoordinates
);

route.post("/get-distance-time",
    query('origin').isString().isLength({min : 3}).withMessage("origin is required"),
    query('destination').isString().isLength({min : 3}).withMessage("destination is required"),
    authMiddleware.authUser,
    mapsController.getDistanceTime
)

route.get("/get-suggestions",
    query('address').isString().isLength({min : 3}).withMessage("address is required"),
    authMiddleware.authUser,
    mapsController.getSuggestion
)


module.exports = route;