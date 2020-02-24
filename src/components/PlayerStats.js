import React from 'react'

const PlayerStats = ({focus}) => {
  return (
    <div className="player-stats content">
      <div className="player-stats-header">
        {focus ? (
        <h1>{focus.temporaryDisplayName}</h1>
        ) : <h1>Player Stats</h1>}
      </div>
    </div>
  )
}

export default PlayerStats