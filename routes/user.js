const express=require("express");
const Router=express.Router;
const {UserModel,PurchaseModel}=require("../db");
const router=Router();
const {UserMiddleWare}=require("../MiddleWare/UserMiddleWare")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const {z}=require("zod")

router.post("/signup",async (req,res)=>{
    let firstName=req.body.firstname;
    let LastName=req.body.Lastname;
    let email=req.body.email;
    let password=req.body.password;
    try{
        let hasdedpass=await bcrypt.hash(password,4);
       await UserModel.create({
            firstName:firstName,
            LastName:LastName,
            email:email,
            password:hasdedpass
        })

        res.status(200).json({
            message:"Success"
        });

    }catch(e){
        res.status(401).json({
            message:"Email Already exists"
        })
    }
});


router.post("/signin",async (req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    try{
        console.log(email,password);
        const response= await UserModel.findOne({
            email:email
        });
       const Vaild=await bcrypt.compare(password,response.password);
       if(Vaild){
        let token=jwt.sign({
            userid:response._id
        },process.env.JWT_SECERT);
        res.status(200).json({
            message:"Success",
            token:token
        })}else{
            res.status(401).json({
                message:"Invaild Password Or Email Id"
            });
        }
       }catch(e){
        res.status(404).json({
            message:"Database Fetch Error"
        })
}
    
});

router.post("/buy",UserMiddleWare,async (req,res)=>{
    try{
    let courseid=req.body.courseid;
    console.log(req.userID);
    await PurchaseModel.create({
        userid:req.userID,
        courseid:courseid
    })
   return res.status(200).json({
        message:"Course Was Purchased Successfully"
    })
    }catch(e){
        console.log(e);
       return res.status(402).json({
            message:"Failed"
        })
    }
});


module.exports ={
    userRoutes:router
}