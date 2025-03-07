const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db/db");
const userRouter = require("./routes/user.routes");

connectToDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/users", userRouter);

app.get("/", (req,res)=>{
    res.send("hello world")
})

module.exports = app;