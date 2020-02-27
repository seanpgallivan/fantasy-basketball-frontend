import React from 'react'
import DraftRound from '../components/DraftRound'

const DraftLog = ({players, franchises, league, onSetFocus}) => {

  const showDraftRounds = () => {
    let turnsCount = league.teams.reduce((acc, team) => acc + team.roster.length, 0)
    let roundsCount = Math.floor(turnsCount / league.teams.length) + 1
    let rounds = []
    for (let i = 0; i < roundsCount; i++) {
      rounds.push(
        <DraftRound 
          key={i + 1} 
          index={i} 
          count={turnsCount}
          players={players}
          franchises={franchises}
          league={league}
          onSetFocus={onSetFocus}
        />
      )
    }
    return rounds
  }

  return (
    <div className="draft-log content">
      <div className="draft-log-header">
        <h1>Draft Log</h1>
      </div>
      <div className="draft-log-box">
        {league.id ? showDraftRounds() : null}
      </div>
    </div>
  )
}

export default DraftLog