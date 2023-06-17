const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const rtoSchema=new Schema(
    {
        sid:String,
        uid:String,
        rid:String,
    },
        {versionKey: false}

)

const rto=mongoose.model("rto",rtoSchema);

module.exports=rto;