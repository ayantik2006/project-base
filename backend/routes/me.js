const express=require("express");
const router=express.Router();
const authController=require("../controllers/me.js");
const checkLoggedIn=require("../middlewares/checkLoggedIn.js");

router.post("/name-username",checkLoggedIn.checkLoggedIn,authController.nameUsername)
router.post("/profile",checkLoggedIn.checkLoggedIn,authController.getMeProfileDetails)

module.exports=router;