import React from 'react'
import Player from '../components/Player'

const DraftRound = ({index, players, franchises, league, league: {teams}, onSetFocus}) => {

  const showTurns = () => {
    let order = index % 2 === 0 ? league.seed_order : [...league.seed_order].reverse()
    let turns = []
    for (let i = 0; i < teams.length; i++) {
      let turn = teams[order[i]]
      console.log(turn, index)
      let player = turn.roster[index]
      if (player) {
        let choice = 
            <Player 
              key={player}
              container="log"
              index={teams.length * index + i + 1}
              player={players[player]}
              franchise={franchises[players[player].teamId]}
              onSetFocus={onSetFocus}
            />
        turns.push(choice)
      } else {
        let choice = 
          <div className="player-sm">
            <div className="stat-i-lg">
              {teams.length * index + i + 1}
            </div>
            <div className="draft-turn">
              <div className="draft-name">
                {turn.name}
              </div>
            </div>


          </div>
        turns.push(choice)
      }
    }
    return turns
  }

  return (
    <div className="draft-round">
      <h2>Round {index + 1}:</h2>
      {showTurns()}
    </div>
  )
}

export default DraftRound