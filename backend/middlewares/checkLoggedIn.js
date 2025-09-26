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