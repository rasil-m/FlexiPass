import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

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
          <div className="__rto">
      <Navbar/>
      <div className="__rto_contents">
        <Outlet/>
      </div>
    </div>
    :null
    }
    </>

  )
}

export default Layout