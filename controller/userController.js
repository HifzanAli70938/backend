const{body,validationResult}=require('express-validator');
let User=require('../models/userSchema');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { hash } = require('bcrypt');
require('dotenv').config();
module.exports.registerValidations=[
    body("name").not().isEmpty().trim().withMessage("Name is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").isLength({min:6}).withMessage("Password must be 6 character long"),
]
// creating rejister function
module.exports.rejister=async(req,res)=>{
const{name,email,password}=req.body;
const errors=validationResult(req);
if(!errors.isEmpty()){
  return  res.status(500).json({errors:errors.array()})
};
// Now using userSchema to match email
try {
    let checkUsers=await User.findOne({email:email})
    if(checkUsers){
        return  res.status(200).json({errors:[{msg:"User already exist"}]})
    };
    // hasing password
    let salt=await bcrypt.genSalt(12);
    let hash=await bcrypt.hash(password,salt);
    try {
       const user=await User.create({
           name,
           email,
           password:hash
       }) ;
       const token=jwt.sign({user},process.env.SECRET,
        // expiry date
        {
expiresIn:"7d"
        });
        return  res.status(200).json({msg:"Your account has been created",token})
    } catch (error) {
        
    }
} catch (error) {
    return  res.status(500).json({errors:error})
}

    };
    // creating login validations
    module.exports.loginValidations=[
        body("email").not().isEmpty().trim().withMessage("Email is required"),
        body("password").isLength({min:6}).withMessage("Password is invalid"),
    ]
    // creating login function
module.exports.login=async (req,res)=>{
    const{email,password}=req.body;
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(404).json({errors:errors.array()})
}else{
    let matchEmail=await User.findOne({email:email});
    if(matchEmail){
        //  res.status(200).json({msg:"You logedin successfully"});
        try {
            let matchPassword=await bcrypt.compare(password,matchEmail.password);
            console.log(matchEmail.password);
            if(matchPassword){
                return  res.status(200).json({msg:"You password and email match successfully"});
            }
        } catch (error) {
            return res.status(404).json({msg:"you password does not match"})
        }
       
    }else{
        return res.status(404).json({msg:"you are not already exist"})
    }
}
}