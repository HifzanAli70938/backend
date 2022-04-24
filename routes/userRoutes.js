const app=require("express");
const router=app.Router();
const {
    rejister,
    login,
    registerValidations,
    loginValidations
}=require('../controller/userController')
router.post("/rejister",registerValidations,rejister);
router.post("/login",loginValidations,login);
module.exports=router;