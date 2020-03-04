import React from 'react'

const PlayerStats = ({focus, franchise}) => {

  return (
    <div className="player-stats content">
      <div className="player-stats-header">
        <h1>Player Stats</h1>
      </div>
        {focus ? (
          <>
            <div 
              className="player-img" 
              style={{backgroundImage: `url(https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${focus.personId}.png)`}}
            ></div>
            <div 
              className="player-box-logo"
              style={{backgroundImage: `url(https://www.nba.com/assets/logos/teams/primary/web/${franchise.tricode}.svg`}} 
            ></div>
            <div className="player-box">
              <div className="player-headline">
                <h1>{focus.firstName + " " + focus.lastName}</h1>
              </div>
              <div className="player-statline">
                
              </div>
            </div>
          </>
        ) : null}
    </div>
  )
}

export default PlayerStats