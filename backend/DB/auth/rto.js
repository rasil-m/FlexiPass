const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const rtoSchema=new Schema({

    email:String,
    name:String,
    password:String
},
{versionKey: false}
)

const rto=mongoose.model("rtos",rtoSchema);

module.exports=rto;