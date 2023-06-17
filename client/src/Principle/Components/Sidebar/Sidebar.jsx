import React from 'react'
import './Sidebar.css'
import {Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <Link to=''><i class="fa-solid fa-grip"></i> Dashboard</Link>
        <Link to='Register'><i class="fa-solid fa-user-plus"></i> Register</Link>
        <Link to='status'><i class="fa-solid fa-arrow-trend-up"></i> Check Status</Link>
        <Link to='update'><i class="fa-solid fa-retweet"></i> Update/Delete</Link>

        <div className="_bottom_icon">
        <Link to="settings"><i class="fa-solid fa-gear"></i>  Settings</Link>
        <a href=""><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
        </div>

      </nav>
    </div>
  )
}

export default Sidebar