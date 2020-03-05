import React from 'react'
import Player from '../components/Player'

const DraftQueue = ({players, focus, elims, franchises, queue, onSetFocus, onEnqueue}) => {

  const showPlayers = () => 
    queue.map((id, index) => 
      <Player 
        key={id}
        container="queue"
        index={index + 1}
        player={players[id]}
        focus={focus}
        elim={elims[id]}
        franchise={franchises[players[id].teamId]}
        onSetFocus={onSetFocus}
        onEnqueue={onEnqueue}
      />)

  return (
    <div className="draft-queue content">
      <div className="content-header">
        <h1>Draft Queue</h1>
      </div>
      <div className="content-box">
        {showPlayers()}
      </div>
    </div>
  )
}

export default DraftQueue