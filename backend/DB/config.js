const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name:String,
  url:String,
  age:String,
  course:String,
  from:String,
  to:String,
  startDate:String,
  endDate:String,
  phone:String,
  email:String,
  sid:String,
  rid:String,
  Status:{type:String,default:"Pending"}
 },
  {versionKey: false}
);

const student=mongoose.model("students",studentSchema);

module.exports=student;