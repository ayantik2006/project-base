const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth.js");
const checkLoggedIn=require("../middlewares/checkLoggedIn.js");

router.post("/user",checkLoggedIn.checkLoggedIn,authController.getUser)
router.post("/signup",authController.signup)
router.get("/verification/:id",authController.verification);
router.post("/signin",authController.signin);
router.post("/signout",authController.signout);
router.get("/google",authController.getGoogleLoginPage)

module.exports=router;