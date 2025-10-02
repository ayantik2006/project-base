// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

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