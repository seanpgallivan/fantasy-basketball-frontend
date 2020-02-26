import React from 'react'
import Player from '../components/Player'

const PlayerList = ({players, franchises, focus, queue, onSetFocus, onEnqueue}) => {

  const showPlayers = () => 
    players ? players.map((player, index) => 
      <Player 
        key={player.personId}
        container="list"
        index={index + 1}
        player={player}
        franchise={franchises[player.teamId]}
        queued={queue.includes(player.personId)}
        onSetFocus={onSetFocus}
        onEnqueue={onEnqueue}
      />
      ) : null

  return (
    <div className="player-list content">
      <div className="player-list-header">
        <h1>Player List</h1>
      </div>
      <div className="player-list-box">
        {showPlayers()}
      </div>
    </div>
  )
}

export default PlayerList