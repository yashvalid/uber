const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");

connectToDB();
const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/captains", captainRouter);


app.get("/", (req,res)=>{
    res.send("hello world")
})

module.exports = app;