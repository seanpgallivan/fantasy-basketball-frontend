import React from 'react'

const PlayerStats = ({focus}) => {
  return (
    <div className="player-stats content">
      {focus ? (
      <h1>{focus.temporaryDisplayName}</h1>
      ) : <h1>Player Stats</h1>}
    </div>
  )
}

export default PlayerStats