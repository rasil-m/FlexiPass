const express=require("express");
const mongoose=require("mongoose");

const app=express();
mongoose.connect('mongodb://0.0.0.0:27017/FlexiPass');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name:String,
  title:String
 },
  {versionKey: false}
);

const student=mongoose.model("students",studentSchema);

const insertData=async()=>
 {
    const data=student({
            "name":"Danniel Macraty S",
            "title":"Successfull Student"
        });
    data.save();
 }

const getData=async()=>
 {
   const data=await student.find();
   console.log(data);
 }
 insertData();
 getData();

app.listen("3000");