import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import './Header.css'
import { useParams } from 'react-router-dom'

const Header = () => {
    const[student,setStudent]=useState([])
    const { id } = useParams();
    
    axios.get("http://localhost:8081/fetchStudent/"+id)
    .then((res)=>{
        console.log(res.data)
    })
    
  return (
    <div className="__student__header">
    </div>
  )
}

export default Header