/*
 * Project: Base
 * Author: Ayantik Sarkar
 * Copyright (c) 2025
 * Licensed under Apache 2.0
 */

const jwt=require("jsonwebtoken");

exports.checkLoggedIn=async(req,res,next)=>{
    try{
        const email= await jwt.verify(req.cookies.user,process.env.SECRET_KEY).id;
    }
    catch(e){
        res.json({msg:"logged out"});
    }
    next();
}