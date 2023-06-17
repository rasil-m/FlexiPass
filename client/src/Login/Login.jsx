import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [data,setData]=useState({
    type:"",
    mail:"",
    password:"",
    required:false,
    res:false
  })

  const navigate=useNavigate()
  

  const hanldeForm=(e)=>
   {
    e.preventDefault()
    if(data.mail=="" || data.type=="" || data.password=="")
          {
            setData({...data,required:true})
          }
          else
          {
            setData({...data,required:false})
            axios.post("http://localhost:8081/login",data)
            .then((res)=>{
              if(!res.data)
               {
                setData({...data,res:true})
               }
               else
               {
                console.log(res.data)
                localStorage.setItem('status', true)
                localStorage.setItem('id', res.data._id)
                localStorage.setItem('rid', res.data.rid)
                if(res.data.sid!=undefined)
                {
                  navigate("/principle")
                }
                else
                {
                  navigate("/rto")
                }
                
               }
            })

          }
   }

  return (
    <div className="__login">
        <h1>Login</h1>
        <form action="">
          <p className='type'>
            <label>
              <span>
                <input type="radio" name='type' value="rto" onClick={(e)=>{setData({...data,type:e.target.value})}}/> RTO
              </span>
              <span>
                <input type="radio" name='type' value="school" onClick={(e)=>{setData({...data,type:e.target.value})}}/> School
              </span>
            </label>
          </p>
            <p>
                <input type="mail" value={data.mail} onChange={(e)=>{setData({...data,mail:e.target.value})}} required/>
                <label>email id *</label>
            </p>
            <p>
                <input type="password"  value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}} required/>
                <label>password *</label>
            </p>
            {
              data.required?
              <p className='__mark'>
              Fill all field to proceed
            </p>:null
            }
            {
              data.res?
              <p className='__mark'>
              No User Found !
            </p>:null
            }
            
               
            <button onClick={hanldeForm}>Login</button>
        </form>
    </div>
  )
}

export default Login