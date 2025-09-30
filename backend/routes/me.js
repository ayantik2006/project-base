const express=require("express");
const router=express.Router();
const meController=require("../controllers/me.js");
const checkLoggedIn=require("../middlewares/checkLoggedIn.js");

router.post("/name-username",checkLoggedIn.checkLoggedIn,meController.nameUsername);
router.post("/profile",checkLoggedIn.checkLoggedIn,meController.getMeProfileDetails);
router.post("/username-available",checkLoggedIn.checkLoggedIn,meController.isUsernameAvailable);

module.exports=router;