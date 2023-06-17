import React, { useState } from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'


const Layout = () => {

  const[auth,Setauth]=useState()
  const status=localStorage.getItem('status')
  
  useEffect(() => {
       Setauth(status)

  })

  return (    
    <>
  {
    auth?
    <div className="__Principle">
      <Sidebar/>
        <div className="__Principle_Content">
          <Outlet/>
        </div>  
  </div>:null
  }
  </>
  )
}

export default Layout