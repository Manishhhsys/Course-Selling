const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const ObjectId = Schema.ObjectId;



const users= new Schema({
    firstName:String,
    LastName:String,
    email: { type:String,unique:true},
    password:String,    
})

const admin=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    LastName:String
})

const course=new Schema({
    title:String,
    description:String,
    price:String,
    imageurl:String,
    creatorId:{type:ObjectId}
})

const purchasedinfo=new Schema({
    courseid:{type:String,ref:"course",unique:true},
    userid:{type:ObjectId,ref:"users"}
})


const UserModel=mongoose.model("users",users);
const AdminModel=mongoose.model("admin",admin);
const CourseModel=mongoose.model("course",course);
const PurchaseModel=mongoose.model("purchasedInfo",purchasedinfo);

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}