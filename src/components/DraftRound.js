import React, {Fragment} from 'react'
import Player from '../components/Player'

const DraftRound = ({index, count, players, elims, top, franchises, league, team, league: {teams}, onSetFocus, expanded, onExpandRound, onDraftPlayer}) => {

  const topPick = () => {
    let pick = team.queue.find(id => !elims[id])
    if (!pick) pick = top
    return pick
  }

  const handleExpand = () => 
    onExpandRound(index, !expanded)

  const handleDraftPlayer = () =>
    onDraftPlayer(topPick())



  const showTurns = () => {
    let order = index % 2 === 0 ? league.seed_order : [...league.seed_order].reverse()
    let turns = [], turnClass = ""
    let current = order[(count % teams.length)]
    for (let i = 0; i < teams.length; i++) {
      let turn = teams[order[i]]
      let player = turn.roster[index]
      let choice
      if (player) {
        choice = 
          <Player 
            key={player}
            container="log"
            index={teams.length * index + i + 1}
            player={players[player]}
            elim={elims[player]}
            franchise={franchises[players[player].teamId]}
            onSetFocus={onSetFocus}
          />
      } else if (current === order[i] && teams[current].id === team.id) {
        choice = 
          <Fragment key={i}>
            <div className="player-sm">
              <div className="stat-i-lg">
                {teams.length * index + i + 1}
              </div>
              <div className="draft-turn">
                <button onClick={handleDraftPlayer}>Draft<br />{players[topPick()].temporaryDisplayName}</button>
              </div>
            </div>
          </Fragment>
      } else {
        turnClass = "draft-name"
        if (turn.id === team.id) turnClass += " myTurn"
        if (order[i] === current) turnClass += " currentTurn"
        choice = 
          <Fragment key={i}>
            <div className="player-sm">
              <div className="stat-i-lg">
                {teams.length * index + i + 1}
              </div>
              <div className="draft-turn">
                
                <div className={turnClass}>
                  {turn.name}
                </div>
              </div>
            </div>
          </Fragment>
      }
      turns.push(choice)
    }
    return turns
  }

  return (
    <div className="draft-round">
      <div className={expanded ? "expand-minus" : "expand-plus"} onClick={handleExpand}></div>
      <div className="draft-round-header">
        Round {index + 1}:
      </div>
      {expanded ? showTurns() : null}
    </div>
  )
}

export default DraftRound