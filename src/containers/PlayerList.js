import React from 'react'
import Player from '../components/Player'

const PlayerList = ({players, teams, stats, focus, queue, onLoadPlayers, onLoadStats, onSetFocus, onEnqueue}) => {

  const showPlayers = () => 
    players && teams ? players.map((player, index) => 
      <Player 
        key={index + 1}
        index={index + 1}
        player={player}
        team={teams[player.teamId]}
        stat={stats ? stats[player.personId].latest : null}
        queue={!!queue.find(q => q.personId === player.personId)}
        onSetFocus={onSetFocus}
        onEnqueue={onEnqueue}
      />
      ) : null

  return (
    <div className="player-list content">
      <button 
        disabled={players && teams}
        onClick={onLoadPlayers}
      >
        Load Players
      </button>
      <button 
        disabled={stats}
        onClick={onLoadStats}
      >
        Load Stats
      </button>
      <div className="player-list-box">
        {showPlayers()}
      </div>
    </div>
  )
}

export default PlayerList