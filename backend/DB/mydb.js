const express=require("express");
const mongoose=require("mongoose");

const app=express();

mongoose.connect('mongodb://0.0.0.0:27017/FlexiPass');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name:String,
  title:String
});

const student =db.model('students', studentSchema);
const doc={ "name":"rasil","title":"student1" };

const res=async()=>
 {
   const rs=await student.insertOne(doc);
   console.log("Data uploaded");
 }

const getData=async()=>
 {
   const data=await student.find();
   console.log(data);
 }
 res();
 getData();

app.listen("3000");