import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = ({players, league, league: {teams, seed_order}, team, history, onLogout, onLoadData, onLoadTeam, onSwitchLeague, onResetDraft}) => {

  const handleLogout = () => {
    history.push('/login')
    onLogout()
  }

  const handleSwitchUser = () => {
    let turnsCount = teams.reduce((acc, team) => acc + team.roster.length, 0)
    let roundsCount = Math.floor(turnsCount / teams.length) + 1
    let order = roundsCount % 2 === 1 ? seed_order : [...seed_order].reverse()
    let teamIdOrder = order.map(el => teams[el].id)
    teamIdOrder = teamIdOrder.concat(teamIdOrder)
    let nextTeam = teamIdOrder[teamIdOrder.indexOf(team.id) + 1]
    onLoadTeam(nextTeam)
  }

  const handleSwitchLeague = () => {
    // history.push('/user/home')
    onSwitchLeague()
  }

  const handleResetDraft = () => {
    // history.push('/user/home')
    onResetDraft()
  }


  return (
    <div className="navbar">
      <NavLink to="/"><div className="navlogo"></div></NavLink>
      {/* <div className="navborderleft"></div>
      <NavLink to="/user/home"><div className="navitemleft">Home</div></NavLink> */}
      <div className="navborderleft"></div>
      <NavLink to="/user/draft"><div className="navitemleft">Draft</div></NavLink>
      {/* <div className="navborderleft"></div>
      <div className="navitemleft" onClick={players ? onLoadData : null}>Load Data</div> */}
      <div className="navborderleft"></div>
      <div className="navborderright"></div>
      <div className="navitemright" onClick={handleLogout}>Log Out</div>
      <div className="navborderright"></div>
      <div className="navitemright" onClick={handleSwitchUser}>Team</div>
      <div className="navborderright"></div>
      <div className="navitemright" onClick={handleSwitchLeague}>League</div>
      <div className="navborderright"></div>
      <div className="navitemright" onClick={handleResetDraft}>Reset</div>
      <div className="navborderright"></div>
      <div className="navitemright" style={{width: '300px'}}>{team.name}</div>
    </div>
  )
}

export default NavBar