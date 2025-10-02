/*
 * Project: Base
 * Author: Ayantik Sarkar
 * Copyright (c) 2025
 * Licensed under Apache 2.0
 */

const express=require("express");
const router=express.Router();
const meController=require("../controllers/me.js");
const checkLoggedIn=require("../middlewares/checkLoggedIn.js");
const multer = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router.post("/name-username",checkLoggedIn.checkLoggedIn,meController.nameUsername);
router.post("/profile",checkLoggedIn.checkLoggedIn,meController.getMeProfileDetails);
router.post("/username-available",checkLoggedIn.checkLoggedIn,meController.isUsernameAvailable);
router.post("/edit-profile",upload.single("avatar-img"),meController.editProfile);
router.post("/delete-profile-picture",meController.deleteProfilePicture);
router.post("/save-about",checkLoggedIn.checkLoggedIn,meController.saveAbout);

module.exports=router;