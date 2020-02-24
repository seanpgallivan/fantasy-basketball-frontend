import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = ({history, onLogout}) => {

  const handleLogout = () => {
    history.push('/login')
    onLogout()
  }

  return (
    <div className="navbar">
      <NavLink to="/"><div className="navlogo"></div></NavLink>
      <div className="navborderleft"></div>
      <NavLink to="/user/home"><div className="navitemleft">Home</div></NavLink>
      <div className="navborderleft"></div>
      <NavLink to="/user/draft"><div className="navitemleft">Draft</div></NavLink>
      <div className="navborderleft"></div>
      <div className="navitemright" onClick={handleLogout}>Log Out</div>
      <div className="navborderright"></div>
    </div>
  )
}

export default NavBar