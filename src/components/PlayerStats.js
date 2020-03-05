import React from 'react'
import Season from './Season'

const PlayerStats = ({focus, seasons, franchises, onExpandSeasons}) => {

  const showSeasons = () => {
    let rows = []
    focus.stats.regularSeason.season.forEach(sn => 
      sn.teams.forEach(seg => {
        seg.year = sn.seasonYear
        seg.teamcode = franchises[seg.teamId].tricode
        seg.teamname = franchises[seg.teamId].fullName
        rows.push(<Season key={rows.length} season={seg} onExpandSeasons={onExpandSeasons}/>)
      })
    )
    let last = <Season key="total" season={focus.stats.careerSummary} onExpandSeasons={onExpandSeasons}/>
    return seasons ? [...rows, last] : [rows[0], last]
  }
  

  return (
    <div className="player-stats content">
      <div className="content-header">
        <h1>Player Stats</h1>
      </div>
        {focus ? (
          <>
            <div 
              className="player-box-logo"
              style={{backgroundImage: `url(https://www.nba.com/assets/logos/teams/primary/web/${franchises[focus.teamId].tricode}.svg`}} 
            ></div>
            <div className="player-headline">
              <div className="headline-name">{focus.firstName + " " + focus.lastName}</div>
              <div className="headline-team">{franchises[focus.teamId].fullName}</div>
            </div>

            <div 
              className="player-img" 
              style={{backgroundImage: `url(https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${focus.personId}.png)`}}
            >
              <div className="jersey-pos">
                <div className="jersey-box">
                  <div className="jersey-wrapper">
                    <div className="jersey-hash">#</div>
                    <div className="jersey-num">{focus.jersey}</div>
                  </div>
                </div>
                <div className="pos-box">{focus.pos}</div>
              </div>
            </div>

            <div className="player-statline">
              <div className="headline-xs">{focus.heightFeet}' {focus.heightInches}"</div>
              <div className="headline-xs">{focus.weightPounds} lbs.</div>
              <div className="headline-xs">{focus.dateOfBirthUTC}</div>
              <div className="statline-header">
                <div className="statline-xl">
                  <div className="statline-med" title="Season">SEASON</div>
                  <div className="statline-lg" title="Team">TEAM</div>
                </div>
                <div className="statline-sp"></div>
                <div className="statline-sm" title="Games Played">GP</div>
                <div className="statline-sp"></div>
                <div className="statline-sm" title="Field Goal Percentage">FG%</div>
                <div className="statline-sm" title="Three Point Percentage">3P%</div>
                <div className="statline-sm" title="Free Throw Percentage">FT%</div>
                <div className="statline-sp"></div>
                <div className="statline-sm" title="Points Per Game">P/G</div>
                <div className="statline-sm" title="Assists Per Game">A/G</div>
                <div className="statline-sm" title="Rebounds Per Game">R/G</div>
                <div className="statline-sm" title="Steals Per Game">S/G</div>
                <div className="statline-sm" title="Blocks Per Game">B/G</div>
                <div className="statline-sp"></div>
                <div className="statline-sm" title="Turnovers Per Game">TO/G</div>
              </div>
              {showSeasons()}
              <div className="statline-buff"></div>
            </div>
          </>
        ) : null}
    </div>
  )
}

export default PlayerStats