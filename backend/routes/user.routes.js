const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controllers");



router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({min : 2}).withMessage("First name must be 2 character long"),
    body("password").isLength({min : 6}).withMessage("Password must be 6 character long"),
],
    userController.userRegister
);


module.exports = router;