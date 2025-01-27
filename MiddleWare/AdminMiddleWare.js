require("dotenv").config();
const jwt=require("jsonwebtoken");



function checkAdmin(req,res,next){
    try{
    let token=req.headers.token;
    let decodeinfo=jwt.verify(token,process.env.JWT_SECERT_ADMIN);
    if(decodeinfo){
        req.adminId=decodeinfo.adminId;
        next();
    }}catch(e){
       return res.status(403).json({
            message:"You are not signed in"
        })
        
    }
}

module.exports ={
    AdminMiddleWare:checkAdmin
}