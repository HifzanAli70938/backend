const express=require("express");
const mongoose=require("mongoose");
const connect=require("./config/db");
const router=require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app=express();
require('dotenv').config();
connect();
app.use(bodyParser.json());
app.use("/",router);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Your  app is running");
})