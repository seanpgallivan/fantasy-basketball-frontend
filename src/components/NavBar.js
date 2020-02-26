import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = ({history, onLogout, loading, onLoadData}) => {

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
      <div className="navitemleft">
        <button 
          disabled={loading}
          onClick={onLoadData}
        >
          Load Data
        </button>
      </div>
      <div className="navitemright" onClick={handleLogout}>Log Out</div>
      <div className="navborderright"></div>
    </div>
  )
}

export default NavBar