import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Register = () => {

  const[exist,setExist]=useState(false)
  const[mvdList,setmvdList]=useState()
  const[showMVD,setshowMVD]=useState(true)

    const [data,setData]=useState({
        email:"",
        type:"",
        institute:"",
        password:"",
        matchPassword:"",
        matched:false,
        required:false,
        rid:""
    })



    const navigate=useNavigate()

    const sendData=(e)=>
     {
    axios.post("http://localhost:8081/signup",e)
      .then(function(res){
        console.log(res)
        
        

        if(res.data)
         {
          setExist(res)
         }
         else 
          {
            navigate("/login")
          }

      })
      .catch(function (error) {
        console.log(error);
      });
     }
     //Send form data

    const SignUp=(e)=>
     {
        e.preventDefault()
        if(data.email=="" || data.type=="" || data.institute=="" || data.password=="")
          {
            setData({...data,required:true})
          }
          else
          {
            setData({...data,required:false})
            sendData(data)


          }
     }


     useEffect(()=>{
      axios.get("http://localhost:8081/fetchMVD")
      .then
      ((res)=>{
        setmvdList(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    })

      
     

  return (
    <div className="__register">
        <h1>Sign Up</h1>
        <p className='login'>Already Registered? <Link to="/login">Login</Link></p>
        <form action="">
            <label htmlFor="type">
                <p>
                  <input type="radio" name="type" value="school" onChange={(e)=>{setData({...data,type:e.target.value});setshowMVD(true)}}/> School  
                </p>
                <p>
                  <input type="radio" name="type" value="rto" onChange={(e)=>{setData({...data,type:e.target.value});setshowMVD(false)}} /> RTO  
                </p>
            </label>
            <input type="email"  placeholder='your email id'  onChange={(e)=>{setData({...data,email:e.target.value})}} value={data.email}/>
            {
              showMVD?
              <select value={data.rid} onChange={(e)=>{setData({...data,rid:e.target.value})}}>
                <option value="0">Choose Your RTO</option>
              {
                mvdList?.map((item,key)=>{
                  return(
                    <option value={item._id}>{item.name}</option>
                  )
                })
              }
            </select>
              :null
            }
            <input type="text"  placeholder='Institute name'  onChange={(e)=>{setData({...data,institute:e.target.value})}} value={data.institute}/>
            
            <input type="password"  placeholder='create password'  onChange={(e)=>{setData({...data,password:e.target.value})}} value={data.password}/>
            <input type="password"  placeholder='Re enter password'  onChange={(e)=>{(data.password==e.target.value)?setData({...data,matched:false}):setData({...data,matched:true})}}/>
            {
                data.matched?<p className='match'>Password Must be matched</p>:null
            }
            {
                data.required?<p className='match'>Please Fill all fields to continue</p>:null
            }
            {
                exist?<p className='match'>User Already Exist</p>:null
            }
            
            
            <button onClick={SignUp}>Create Account</button>
        </form>
        
    </div>
  )
}

export default Register