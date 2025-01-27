const express=require("express");
const Router=express.Router;
const {UserMiddleWare}=require("../MiddleWare/UserMiddleWare")
const {PurchaseModel,CourseModel}=require("../db");
const user = require("./user");
const { any } = require("zod");


const router=Router();


router.get("/purchasebyuser",UserMiddleWare,async (req,res)=>{
   try{
    let userID=req.userID;
    let purchases=await PurchaseModel.find({
        userid:userID
    })
    if (purchases.length > 0) {
        const courseIds = purchases.map(purchase => purchase.courseid);
        const courseInfo = await CourseModel.find({ _id: { $in: courseIds } });

        return res.status(200).json({ courseinfo: courseInfo });
    }else{
        res.status(404).json({
            message:"NO Course Found"
        })
    }
   }catch(e){
        console.log(e);
        res.status(500).json({ message: "An error occurred", error: e.message });
   }
});

router.get("/preview",async (req,res)=>{
    try{
        let response=await CourseModel.find({});
        if(response.length>0){
            res.status(200).json({
                courseinfo:response
            })
        }else{
           return res.status(404).json({
                message:"No Course Found"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: "An error occurred while fetching courses",
            error: e.message
        });
    }
});

module.exports={
    CourseRouter:router
}