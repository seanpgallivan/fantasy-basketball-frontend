import React from 'react'

const Player = ({index, player, team, stat, queue, onSetFocus, onEnqueue}) => {

  const handleSetFocus = () =>
    onSetFocus(player)

  const handleEnqueue = () =>
    onEnqueue(player)

  return (
    <div className="player">
      <div className="stat-sm">
        {index}
      </div>
      <div className="stat-sp"></div>
      <div className={queue ? "check-yes" : "check-no"} onClick={handleEnqueue}></div>
      <div className="stat-sp"></div>
      <div className="stat-all" onClick={handleSetFocus}>
        <div className="stat-lg">
          <b>{player.temporaryDisplayName}</b>&nbsp;<i>({team.tricode})</i>
        </div>
        <div className="stat-sm">
          {player.pos}
        </div>
        <div className="stat-sp"></div>
        <div className="stat-sm">
          {stat.gamesPlayed}
        </div>
        <div className="stat-sp"></div>
        <div className="stat-sm">
          {stat.ppg}
        </div>
        <div className="stat-sm">
          {stat.fgp}
        </div>
        <div className="stat-sm">
          {stat.tpp}
        </div>
        <div className="stat-sm">
          {stat.ftp}
        </div>
        <div className="stat-sm">
          {stat.apg}
        </div>
        <div className="stat-sm">
          {stat.rpg}
        </div>
        <div className="stat-sm">
          {stat.spg}
        </div>
        <div className="stat-sm">
          {stat.bpg}
        </div>
        <div className="stat-sm">
          {stat.topg}
        </div>
      </div>
    </div>
  )
}

export default Player