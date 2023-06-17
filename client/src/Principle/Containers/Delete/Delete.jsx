import React from 'react'
import './Delete.css'

import { useState,useEffect } from 'react'
import axios from 'axios'

const Delete = () => {

  const [previmg,PrevSetImg]=useState();
  const [isOpen, setOpen] = useState(false);
  const [uid,Setuid]=useState();
  const [change,setChange]=useState(false);
  const [view,setView]=useState(false);

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

  useEffect(()=>{
    axios.get('http://localhost:8081/fetchdata')
      .then(function (response) {
        console.log(response.data[0].name)
      })
      .catch(function (error) {
        console.log(error);
      })
       } ,[])


       {/* Fetch Data from server*/}


  const handleImg=(e)=>
   {
     setChange(true)
    setitem({...item,url:e.target.files[0]});
    PrevSetImg(URL.createObjectURL(e.target.files[0]));
   }

  

    const updateData=(e)=>
     {
      e.preventDefault();
      const formData = new FormData();
      formData.append("profile",item.url);
      formData.append("name",item.name);
      formData.append("course",item.course);
      formData.append("dob",item.age);
      formData.append("from",item.from);
      formData.append("to",item.to);
      formData.append("startDate",item.startDate);
      formData.append("endDate",item.endDate);
      formData.append("phone",item.phone);
      formData.append("email",item.email);
      formData.append("change",change);
      
      axios.put("http://localhost:8081/updateData",formData)
      .then(function(res){
        window.location.reload(true)

      })
      .catch(function (error) {
        console.log(error);
      });
     }

    const deleteDlg=(e)=>
     {
      e.preventDefault()

      setOpen(true)

     }

    const deleteData=()=>
     {
      axios.delete("http://localhost:8081/delete/"+uid)
      .then(function(response){
        window.location.reload(true)
      })
      .catch(function(err){
        console.log(err)
      })
     }
     

    const FetchData=()=>
     {
      
        axios.get('http://localhost:8081/search/'+uid)
          .then(function (response) {
            setitem(response.data)
            PrevSetImg("http://localhost:8081/uploads/"+response.data.url)
          })
          .catch(function (error) {
            console.log(error);
          })

          setView(true)
        
     }

 
  return (
    <div>
      <div className="__update">
        <h1>Delete/Update</h1>
        <div className="_search">
        <input type="email" className='email' value={uid} placeholder="registerd email id" onChange={(e)=>{Setuid(e.target.value)}} enterKeyHint={FetchData} />
        <i class="fa-solid fa-magnifying-glass" onClick={FetchData}></i>
        </div>
        {view?
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
          <input type="text" placeholder='Student Name' value={item.name} onChange={(e)=>{setitem({...item,name:e.target.value})}} className='SName'/>
          <select className='Scourse' value={item.course} onChange={(e)=>{setitem({...item,course:e.target.value})}}>
            <option value="0" selected>Choose Your Course</option>
            <option value="1">Bsc Mathematics</option>
            <option value="2">Bsc CS</option>
            <option value="3">BCA</option>
            <option value="4">MCA</option>
            <option value="5">MSC Mathematics</option>
          </select>
          <p>
          <label htmlFor="Sage">Choose DOB: </label><br/>
          <input type="date" name='Sage' id='Sage' className='Sage' value={item.age} placeholder='DOB' onChange={(e)=>{setitem({...item,age:e.target.value})}}/>
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
      <div className="__submit">
        <button className='__btn_apply' onClick={updateData}>Update</button>
        <button className='__btn_apply' onClick={deleteDlg}>Delete</button>
      </div>
      
      </form> : null}

      </div>
      {
        isOpen?
      
      <div className="__dltbox">
        <p>Do you want to remove this Student ?</p>
        <button>No</button>
        <button onClick={deleteData}>Yes</button>
      </div>
      :null

      }

    </div>
  )
}

export default Delete