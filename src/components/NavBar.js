import React, { useReducer } from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = ({user, players, league, team, history, onLogout, onLoadData, onLoadTeam, onSwitchLeague, onResetDraft}) => {

  const handleLogout = () => {
    history.push('/login')
    onLogout()
  }

  const handleSwitchUser = () => {
    // let turnsCount = teams.reduce((acc, team) => acc + team.roster.length, 0)
    // let roundsCount = Math.floor(turnsCount / teams.length) + 1
    // let order = roundsCount % 2 === 1 ? seed_order : [...seed_order].reverse()
    // let teamIdOrder = order.map(el => teams[el].id)
    // teamIdOrder = teamIdOrder.concat(teamIdOrder)
    // let nextTeam = teamIdOrder[teamIdOrder.indexOf(team.id) + 1]
    // onLoadTeam(nextTeam)
  }


  const handleResetDraft = () => {
    onResetDraft()
  }


  return (
    <div className="navbar">
      <NavLink to="/"><div className="navlogo"></div></NavLink>
      <div className="navborderleft"></div>
      <NavLink to="/user/home"><div className="navitemleft">Home</div></NavLink>
      <div className="navborderleft"></div>
      <NavLink to="/user/league"><div className="navitemleft">League</div></NavLink>
      <div className="navborderleft"></div>
      <NavLink to="/user/team"><div className="navitemleft">Draft</div></NavLink>
      {/* <div className="navborderleft"></div>
      <div className="navitemleft" onClick={players ? onLoadData : null}>Load Data</div> */}
      <div className="navborderleft"></div>
      <div className="navitemright" onClick={handleLogout}>Log Out</div>
      <div className="navborderright"></div>
      {team.id ? (<>
        <div className="navitemright" onClick={handleSwitchUser}>Team</div>
        <div className="navborderright"></div>
        <div className="navitemright" onClick={handleResetDraft}>Reset</div>
        <div className="navborderright"></div>
      </>) : null}
      <div className="navinforight">Welcome, {user ? user.firstname : null}!</div>
    </div>
  )
}

export default NavBar