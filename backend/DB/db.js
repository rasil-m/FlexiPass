const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://0.0.0.0:27017";

const client = new MongoClient(uri);
const database = client.db("FlexiPass");
const student = database.collection("students");



const insertData=async()=>
 {
    let res=await student.insertOne(
        {
            "name":"Rasil M",
            "title":"Student1"
        }
    )
    if(res.acknowledged) console.log("Data inserted successfully");
 }

 const getData=async()=>
 {
   let data=await student.find();
   console.log(data);
 }

 insertData();
 getData();