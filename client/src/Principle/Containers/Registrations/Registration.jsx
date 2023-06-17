import React from 'react'
import './Registrations.css'
import { useState } from 'react'
import axios from 'axios'

const Registration = () => {

  const [img,SetImg]=useState();
  const [previmg,PrevSetImg]=useState();
  const [isOpen, setOpen] = useState(false);
  const [change, ischanged] = useState(false);

  const [item,setitem]=useState({
    url:"",
    name:"",
    course:"",
    age:"",
    from:"",
    to:"",
    startDate:"",
    endDate:"",
    phone:"",
    email:""


  });

  const sid=localStorage.getItem("id")
  const rid=localStorage.getItem("rid")

  const handleImg=(e)=>
   {
    setitem({...item,url:e.target.files[0]});
    PrevSetImg(URL.createObjectURL(e.target.files[0]));
    ischanged(true)
   }

   const sendData=(e)=>
    {
      e.preventDefault();
      const formData = new FormData();
      formData.append("profile",item.url);
      formData.append("name",item.name);
      formData.append("course",item.course);
      formData.append("age",item.age);
      formData.append("from",item.from);
      formData.append("to",item.to);
      formData.append("startDate",item.startDate);
      formData.append("endDate",item.endDate);
      formData.append("phone",item.phone);
      formData.append("email",item.email);
      formData.append("change",change);
      formData.append("sid",sid);
      formData.append("rid",rid);
      
      axios.post("http://localhost:8081/sendData",formData)
      .then(function(res){
        console.log("success")
        setOpen(!isOpen)
        console.log(isOpen)

      })
      .catch(function (error) {
        console.log(error);
      });

    }

  


  return (
    
    <div className="__Register">
      <h1>Register a Student</h1>
      <form>
      <div className="__form_f">
      <input type="file" id="img" name="img" accept="image/*" onChange={handleImg}/>
        <div className="product_img">
          <label htmlFor="img" className='label_upload'>
          <p><i class="fa-solid fa-image"></i></p>
          <p>Click to Upload/Drag and Drope your image here</p>
          <img src={previmg} alt="" />
        </label>
        </div>
        <div className="__details_">
          <input type="text" placeholder='Student Name' onChange={(e)=>{setitem({...item,name:e.target.value})}} className='SName'/>
          <select className='Scourse' value={item.course} onChange={(e)=>{setitem({...item,course:e.target.value})}}>
            <option value="0" selected>Choose Your Course</option>
            <option value="1">Bsc Mathematics</option>
            <option value="2">Bsc CS</option>
            <option value="3">BCA</option>
            <option value="4">MCA</option>
            <option value="5">MSC Mathematics</option>
          </select>
          <p>
          <label htmlFor="Sage">Choose age: </label><br/>
          <input type="date" name='Sage' id='Sage' className='Sage' value={item.age} placeholder='age' onChange={(e)=>{setitem({...item,age:e.target.value})}}/>
          </p>
          
        </div>
      </div>
      <div className="__form_s">
        <div className="__route">
        <input type="phone" className='Semail' placeholder='+91 xxxxx xxxxx' value={item.phone} onChange={(e)=>{setitem({...item,phone:e.target.value})}}/>
        <input type="email" className='Semail' placeholder='Email id' value={item.email} onChange={(e)=>{setitem({...item,email:e.target.value})}}/>
        </div>
        <div className="__route">
          <input type="text" placeholder='Choose Origin' value={item.from} onChange={(e)=>{setitem({...item,from:e.target.value})}}/>
          <input type="text" placeholder='Choose Destination' value={item.to} onChange={(e)=>{setitem({...item,to:e.target.value})}}/>
        </div>
        <div className="__route">
          <input type="text" placeholder='Start Date' value={item.startDate} onChange={(e)=>{setitem({...item,startDate:e.target.value})}}/>
          <input type="text" placeholder='End Date' value={item.endDate} onChange={(e)=>{setitem({...item,endDate:e.target.value})}}/>
        </div>
      </div>
      <button className='__btn_apply' onClick={sendData}>Apply For Pass</button>
      </form>

      {
        isOpen?
        <div className="__dlg_box">
        <div className="__dlg">
          <p>
            Student has successfully applied for FlexiPass. Further updates will notified shortly.
          </p>
          <a href='?'>Ok</a>
        </div>
      </div>
    :null
      }
      </div>
  )
}

export default Registration