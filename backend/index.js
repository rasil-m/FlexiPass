const express=require("express");
const cors = require('cors');
const app=express();
app.use(cors());
const bodyParser=require("body-parser");
const jsonParser = bodyParser.json();
const multer  = require('multer')
let path = require('path');
const mongoose=require("mongoose");
let student=require("./DB/config");
let rto=require("./DB/auth/rto");
let principle=require("./DB/auth/school");
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://0.0.0.0:27017/FlexiPass');

const upload=multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function(req, file, cb) {   
            cb(null, file.fieldname+ "-"+Date.now()+path.extname(file.originalname));
        },
        fileFilter: function (req, file, cb) {
          if (file) {
            cb(null, true);
          } else {
            cb(new Error('No file available for upload'));
          }
        }

})

}).single("profile");




const formData=(req)=>
 {
   
    let url; 
    if(req.body.change=="true")
     {
      url=req.file.filename
     }
     else
      {
        url=req.body.profile
      }  
    const name=req.body.name;
    const course=req.body.course;
    const age=req.body.age;
    const from=req.body.from;
    const to=req.body.to;
    const startDate=req.body.startDate;
    const endDate=req.body.endDate;
    const phone=req.body.phone;
    const email=req.body.email;
    const sid=req.body.sid
    const rid=req.body.rid
 
    const newStudent=
    {
     url,
     name,
     course,
     age,
     from,
     to,
     startDate,
     endDate,
     phone,
     email,
     sid,
     rid
    }
    return newStudent;
 }


app.post("/sendData",upload, async (req, res)=>{


   const newData=formData(req);
   const Data=new student(newData);
   Data.save().then(()=>{ res.send("Item added")})
   

});

app.get("/fetchData/:rid",(req,res)=>{
    const getData=async()=>
     {
      let data=await student.find({sid:req.params.sid});
      res.send(data);

   
     }
     getData();
});

// Search student

app.get("/search/:email",async(req,res)=>{
    let data=await student.findOne({email:req.params.email})
    if(data)
     {
        res.send(data)
     }
     else
      {
        res.send("No student found")
      }

});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.put("/updateData",upload,async(req,res)=>{
    const newData=formData(req);
    
  
    const data=await student.updateOne(
        {email:req.body.email},{
        $set:
        
            newData

    }
    )
    res.send("success")

});

app.delete("/delete/:email",async(req,res)=>{

  await student.deleteOne({email:req.params.email})
  res.send("success")
})


app.put("/updateStatus/:email",async(req,res)=>{

  const data=await student.updateOne(
    {email:req.params.email},{
    $set:{Status:"Active"}

}
)
  res.send(data)
})

const UserExist=require("./DB/auth/userExist")

const { json } = require("body-parser");

app.post("/signup",(req,res)=>{

  const myPlaintextPassword=req.body.password

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    

    if(req.body.type=="rto")
     {
      
      //Data.save().then(()=>{ console.log("Item added")})

      //New........


      const usr=UserExist.fetchOne(rto,req.body.email)

      usr.then((r)=>{
        
        if(!r)
        {

          const Data=new rto({
            email:req.body.email,
            name:req.body.institute,
            password:hash
          });
      Data.save().then(()=>{ console.log("Item added")})
      res.send(false)
    
    }
    else{
      res.send(true)
    }

    })

      
      
     }
    if(req.body.type=="school")
     {
      
      const usr=UserExist.fetchOne(principle,req.body.email)

      usr.then((r)=>{
        
        if(!r)
        {

      const Data=new principle({
        email:req.body.email,
        name:req.body.institute,
        password:hash,
        rid:req.body.rid
      });
      Data.save().then(()=>{ console.log("Item added")})
      res.send(false)
    
    }
    else{
      res.send(true)
    }

    })

     }


    
});


})

const login=require("./DB/auth/Login")


app.post("/login",(req,res)=>{

  const status=login.Login((req.body.type=="rto")?rto:principle,req.body.mail)
  

  status.then((data)=>
  {
    
    bcrypt.compare(req.body.password, data.password, function(err, result) {
      if(result)
       {
        res.send(data)
       }
       else
       {
        res.send("false")
       }
  });
  //compare password

  })

})


app.get("/fetchMVD",async(req,res)=>{
  let data=await rto.find()
  res.send(data)

})

app.get("/fetchStudent/:id",async(req,res)=>{
  let data=await student.findOne({_id:req.params.id})
  res.send(data)
})



app.listen(process.env.PORT || 8081);