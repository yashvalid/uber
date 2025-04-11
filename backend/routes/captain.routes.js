const express = require("express");
const router = express.Router();
const {body, query} = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middlewares")

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({min : 2}).withMessage("First name must be 2 character long"),
    body("password").isLength({min : 6}).withMessage("Password must be 6 character long"),
    body("vehicle.color").isLength({min : 3}).withMessage("Color must be 3 character long"),
    body("vehicle.plate").isLength({min : 3}).withMessage("Plate must be 3 character long"),
    body("vehicle.capacity").isLength({min : 1}).withMessage("Capacity must be 1 character long"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type"),
],
    captainController.registerCaptain
);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min : 6}).withMessage("Password must be 6 character long"),
],
    captainController.captainLogin
);

router.get("/profile",authMiddleware.authCaptain ,captainController.captainProfile);

router.get("/logout", authMiddleware.authCaptain, captainController.captainLogout);

router.get("/confirmed-captain/:id",
    captainController.confirmedCaptain
)

module.exports = router;