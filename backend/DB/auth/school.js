const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const principleSchema=new Schema({

    email:String,
    name:String,
    password:String,
    rid:String
},
{versionKey: false}
)

const principle=mongoose.model("principle",principleSchema);

module.exports=principle;