import React from 'react'
import Player from '../components/Player'

const DraftQueue = ({players, franchises, queue, onSetFocus, onEnqueue}) => {

  const showPlayers = () => 
    queue.map((id, index) => 
      <Player 
        key={id}
        container="queue"
        index={index + 1}
        player={players[id]}
        franchise={franchises[players[id].teamId]}
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