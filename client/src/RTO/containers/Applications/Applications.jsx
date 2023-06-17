import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './Applications.css'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Applications = () => {

  const [Data,setData]=useState([]);
  const [active,Setactive]=useState(false)


  useEffect(()=>{
    axios.get('http://localhost:8081/fetchdata/mvdvtk@gmail.com')
      .then(function (response) {
        setData(response.data);
        Setactive(true)
      })
      .catch(function (error) {
        console.log(error);
      })
       } ,[])

       //Fetch Data

       const Update=(e)=>
        {
          axios.put("http://localhost:8081/updateStatus/"+e)
          .then(function(res){
            window.location.reload(true)

          })
          .catch(function (error) {
           console.log(error);
           });

        }

        //Update Date

        const Delete=(e)=>
         {
          axios.delete("http://localhost:8081/delete/"+e)
          .then(function(response){
           window.location.reload(true)
         })
         .catch(function(err){
          console.log(err)
          })
         }

         //Delete Data

       const showDetails=(e)=>
        {
          document.getElementById("detail"+e).style.display="block"
        }

       const student=Data.map((items,key)=>{
        let src="http://localhost:8081/uploads/"+items.url;
        return(
    
          <>
          <div className="list_box">
            <img src={src} alt=""/>
            <h2>{items.name}</h2>
            <button className='approve' id="ap" onClick={()=>{showDetails(key)}}>View Application</button>

          </div>
          <div className="details" id={"detail"+key}>
            <div className='__info_box'>
            <i class="fa-solid fa-circle-xmark" onClick={()=>{document.getElementById("detail"+key).style.display="none"}}></i>
              <div className="__info">
                <p>{items.name}</p>
                <p>{items.age}</p>
                <p>{items.from}</p>
                <p>{items.to}</p>
                <p>{items.startDate}</p>
                <p>{items.endDate}</p>
              </div>
              <button className='remove' onClick={()=>Delete(items.email)}>Delete</button>
              <button className='approve' onClick={()=>Update(items.email)}>Approve</button>
            </div>
              
            </div>
          </>
          
          
        )
    
      });



  return (
    <div className="applications">
      <h1>Applications</h1>

      {/* List of studets container */}

      <div className="list_container">
        {active?student:<CircularProgress disableShrink />}
      </div>


    </div>
  )
}

export default Applications