import React from 'react'
import { api } from '../services/api'

const League = ({history, league: {id, name, max_teams, seed_order, draft_start, round_duration, 
  roster_guards, roster_forwards, roster_centers, roster_utility, roster_bench, teams}, onLeagueView}) => {

  const handleLeagueView = e => 
    onLeagueView(id, history, e.target.getAttribute("name"))

  const showStatus = () => {
    let maxTurns = (roster_guards + roster_forwards + roster_centers + roster_utility + roster_bench) * teams.length
    let turnsCount = teams.reduce((acc, team) => acc + team.roster.length, 0)
    if (turnsCount === maxTurns) return "Draft complete! Awaiting League Start!"
    if (turnsCount === 0) return "Draft begins at " + draft_start
    let roundsCount = Math.floor(turnsCount / teams.length) + 1
    let order = roundsCount % 2 === 1 ? seed_order : [...seed_order].reverse()
    let turn = order[turnsCount % roundsCount]
    return "Draft Underway! Currently " + teams[turn].user_name + "'s turn!"
  }

  return (
    <div className="league-card">
      <h1>{name}</h1>
      <p><b>Commissioner:</b> {teams[0].user_name}</p>
      <p><b>Teams:</b> {teams.length} of {max_teams} spots filled</p>
      <p><b>Status:</b> {showStatus()}</p>

      <div className="center-wrapper">
        <button onClick={handleLeagueView} name="league">View League</button>
        <button onClick={handleLeagueView} name="team">View Draft</button>
      </div>
    </div>
  )
}
export default League