import React from 'react'
import './Navbar.css'
import {Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="__navbar">
      <div className="links">
        <Link to=''><i class="fa-solid fa-house"></i> Home</Link>
        <Link to='applications'><i class="fa-solid fa-circle-check"></i> Applications</Link>
        <Link to='messages'><i class="fa-solid fa-message"></i> Messages</Link>
      </div>
      <div className="system">
        <Link to=''><i class="fa-solid fa-gear"></i> Settings</Link>
        <Link to=''><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</Link>
      </div>
    </div>
  )
}

export default Navbar