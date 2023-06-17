import React from 'react'
import './Status.css'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Status = () => {

  const [Data,setData]=useState([]);
  const sid=localStorage.getItem("id")

  useEffect(()=>{
axios.get('http://localhost:8081/fetchdata/'+sid)
  .then(function (response) {
    setData(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
   } ,[])
   

   const student=Data.map((items,key)=>{
    let src="http://localhost:8081/uploads/"+items.url;
    return(

      
      <div className="__list">
        <img src={src}/>
        <h2>{items.name}</h2>
        <p><i class="fa-regular fa-circle-dot"></i>{items.Status}</p>
      </div>
    )

  });


  return (
    <div className="__status">
      <h1>Check Application Status</h1>
      <div>
        <input type="text" placeholder='Registered email id' />
        
        <p>
          <i class="fa-solid fa-sliders"></i>
          <span>Filters</span>
        </p>
      </div>
      <div className="__studentList">
        {student}
      </div>
      {/* end of student container */}
    </div>
  )
}

export default Status