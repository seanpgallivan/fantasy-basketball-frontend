import React from 'react'

const Season = ({season: {year, teamcode, gamesPlayed, fgp, tpp, ftp, ppg, apg, rpg, spg, bpg, topg}}) => {


  return (
    <div className="statline-row">
      {year ? (
        <div className="statline-xl">
          <div className="statline-med">{year}</div>
          <div className="statline-lg">{teamcode}</div>
          <div 
            className="statline-logo" 
            style={{backgroundImage: `url(https://www.nba.com/assets/logos/teams/primary/web/${teamcode}.svg)`}}
          ></div>
        </div>
      ) : (
        <div className="statline-xl">Career Stats</div>
      )}
      <div className="statline-sp"></div>
      <div className="statline-sm">{gamesPlayed}</div>
      <div className="statline-sp"></div>
      <div className="statline-sm">{fgp}</div>
      <div className="statline-sm">{tpp}</div>
      <div className="statline-sm">{ftp}</div>
      <div className="statline-sp"></div>
      <div className="statline-sm">{ppg}</div>
      <div className="statline-sm">{apg}</div>
      <div className="statline-sm">{rpg}</div>
      <div className="statline-sm">{spg}</div>
      <div className="statline-sm">{bpg}</div>
      <div className="statline-sp"></div>
      <div className="statline-sm">{topg}</div>
    </div>
  )
}

export default Season