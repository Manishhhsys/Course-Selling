const express=require("express");
const Router=express.Router;
const {AdminMiddleWare}=require("../MiddleWare/AdminMiddleWare")
const jwt=require("jsonwebtoken");
const { hash } = require("bcrypt");
require("dotenv").config();
const bcrypt=require("bcrypt");
const {UserModel,AdminModel,CourseModel,PurchaseModel}=require("../db");
const { any } = require("zod");

const router=Router();

router.post("/signin",async (req,res)=>{
   try{
   let email=req.body.email;
   let password=req.body.password;
   console.log(email,password)
   let response= await AdminModel.findOne({
    email:email
   })
   let vaild=await bcrypt.compare(password,response.password);
   if(vaild){
        let token=jwt.sign({
            adminId:response._id
        },process.env.JWT_SECERT_ADMIN);
        res.status(200).json({
            message:"Success",
            token:token
        })
   }
}
catch(e){
    res.status(403).json({
        message:"Invalid Email Or Password"
    })
}
})

router.post("/signup",async (req,res)=>{
    try{
        let {email,password,firstName,LastName}=req.body;
        let hasdedpass=await bcrypt.hash(password,4);
         await AdminModel.create({
            firstName,
            LastName,
            email,
            password:hasdedpass
        })
        res.status(200).json({
            message:"Success"
        });

    }catch(e){
        res.json(401).json({
            message:"Email Already exists"
        })
    }
})

router.post("/create-cr",AdminMiddleWare,async (req,res)=>{
    try{
        let {title,description,price,imageurl}=req.body;
        let course=await CourseModel.create({
            title,
            description,
            price,
            imageurl,
            creatorId:req.adminId
        })
        res.status(200).json({
            message:"Course Was Created",
            course_id:course._id
        })
    }catch(e){
        res.status(501).json({
            message:"Unable to Create The Course Please Wait..."
        })
    }  
})

router.delete("/delete-cr",AdminMiddleWare,async (req,res)=>{
   try{
    let {course_id}=req.body;
    const response=await CourseModel.findOneAndDelete({
        _id:course_id,
        creatorId:req.adminId
    })
    if(!response){
        res.status(501).json({
            message:"InValid CourseId OR Your Are Not Authorized "
        })
    }else{
        res.status(200).json({
            message:"Successfully Deleted"
        })
    }
    
}catch(e){
    res.status(501).json({
        message:"InValid CourseId OR Your Are Not Authorized "
    })
}
})

router.put("/Update",AdminMiddleWare,async(req,res)=>{
    try{
        let {title,description,price,imageurl,course_id}=req.body;
        const response=await CourseModel.findOneAndUpdate({
            _id:course_id,
            creatorId:req.adminId
        },{
            title,
            description,
            price,
            imageurl,
        },{
            new:true
        })
        res.status(200).json({
            message:"Course Was Updated",
            course_id:response._id
        })
    }catch(e){
        res.status(502).json({
            message:"InValid Course ID OR Unauthorized"
        });
    }
})

module.exports={
    AdminRoutes:router
}