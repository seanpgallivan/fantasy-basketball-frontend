import React from 'react'
import Player from '../components/Player'

const DraftQueue = ({queue, teams, stats, onSetFocus, onEnqueue}) => {

  const showPlayers = () => 
    queue.map((player, index) => 
      <Player 
        key={index + 1}
        container="queue"
        index={index + 1}
        player={player}
        team={teams[player.teamId]}
        stat={stats ? stats[player.personId].latest : null}
        onSetFocus={onSetFocus}
        onEnqueue={onEnqueue}
      />)

  return (
    <div className="draft-queue content">
      <div className="draft-queue-header">
        <h1>Draft Queue</h1>
      </div>
      <div className="draft-queue-box">
        {showPlayers()}
      </div>
    </div>
  )
}

export default DraftQueue