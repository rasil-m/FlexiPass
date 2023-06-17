const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const client=mongoose.connect('mongodb://0.0.0.0:27017/FlexiPass');
let principle=require("./school");
let rto=require("./rto");

const Login=async(user,email)=>
 {
   const data=await user.findOne({email:email})
   
   if(data)
    return data
   else
    return false
   

 }

module.exports={Login}