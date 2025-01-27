require("dotenv").config();
const jwt=require("jsonwebtoken");
const express=require("express");
const app=express();




function checkuser(req,res,next){
    let token=req.headers.token;
    console.log(token);
    let decodeinfo=jwt.verify(token,process.env.JWT_SECERT)
    if(decodeinfo){
        req.userID=decodeinfo.userid;
        next();
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
        return
    }
}

module.exports={
    UserMiddleWare:checkuser
}