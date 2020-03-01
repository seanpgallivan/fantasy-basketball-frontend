import React, {Component} from 'react'
import DraftRound from '../components/DraftRound'

class DraftLog extends Component{
  state = {
    expanded: {}
  }

  expandRound = (round, exp) => 
    this.setState(prev => ({
      expanded: {...prev.expanded, [round]: exp}
    }))

  showDraftRounds = () => {
    let {players, franchises, league, team, onSetFocus, onDraftPlayer} = this.props
    let {expanded} = this.state
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
          team={team}
          onSetFocus={onSetFocus}
          onDraftPlayer={onDraftPlayer}
          expanded={(i + 1 === roundsCount && expanded[i] === undefined) || expanded[i]}
          onExpandRound={this.expandRound}
        />
      )
    }
    return rounds
  }
  render() {
    let {league} = this.props
    return (
      <div className="draft-log content">
        <div className="draft-log-header">
          <h1>Draft Log</h1>
        </div>
        <div className="draft-log-box">
          {league.id ? this.showDraftRounds() : null}
        </div>
      </div>
    )
  }
}

export default DraftLog