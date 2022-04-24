const mongoose=require("mongoose");
require('dotenv').config();
module.exports= connect=async()=>{
    try {
        const response=await mongoose.connect("mongodb+srv://mern:mern@cluster0.qlhsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
console.log("connection created successfully");
    } catch (error) {
        console.log(error);
    }
  
}







// let DB="mongodb+srv://hifzan:hifzan@cluster0.u4hq3.mongodb.net/hifzan?retryWrites=true&w=majority"

// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(()=>{console.log("cONNECTION CREATED SUCCESSFULLY")}).catch((e)=>{console.log("oops an Error occured")});