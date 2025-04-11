const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");
const mapRoute = require("./routes/map.routes");
const rideRoute = require("./routes/rides.routes");

connectToDB();
const app = express();
// const corsOptions = {
//     origin: '*',
//     // credentials: true, 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     exposedHeaders: ["set-cookie"]
// }
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use("/maps",mapRoute)
app.use("/rides", rideRoute);

module.exports = app;