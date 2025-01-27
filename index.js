const express=require("express");
const app=express();
const jwt=require("jsonwebtoken");
require('dotenv').config();
const { userRoutes } =require('./routes/user')
const {CourseRouter} =require("./routes/course")
const {AdminRoutes }=require("./routes/admin")
const {UserModel,AdminModel,CourseModel,PurchaseModel}=require("./db")
const mongoose=require("mongoose");



mongoose.connect(process.env.Mongo_URL)
app.use(express.json());
app.use('/user',userRoutes);
app.use('/course',CourseRouter);
app.use("/admin",AdminRoutes);




app.listen(process.env._PORT);