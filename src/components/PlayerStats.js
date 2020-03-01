import React from 'react'

const PlayerStats = ({focus, franchise}) => {

  return (
    <div className="player-stats content">
      <div className="player-stats-header">
        {focus ? (
          <h1>{focus.temporaryDisplayName}</h1>
        ) : (
          <h1>Player Stats</h1>
        )}
      </div>
        {focus ? (
          <>
            <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${focus.personId}.png`} alt={focus.temporaryDisplayName} />
            <img src={`https://www.nba.com/assets/logos/teams/primary/web/${franchise.tricode}.svg`} alt={franchise.tricode} />
          </>
        ) : null}
    </div>
  )
}

export default PlayerStats