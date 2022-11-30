import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.scss'

const SidebarItem = ({ active, item }) => {
 
  return (
    <Link
      to={item.path}
      className={active ? "sidebar-item-active" : "sidebar-item"}
    >
      {item.icon}
      <span className="sidebar-item-label">{item.title}</span>
    </Link>
  )
}

export default SidebarItem