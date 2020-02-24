import React from 'react'

const Player = ({container, index, player, team, stat, queue, onSetFocus, onEnqueue}) => {

  const handleSetFocus = () =>
    onSetFocus(player)

  const handleAddQueue = () => 
    onEnqueue(player, "add")

  const handleUpQueue = () => 
    onEnqueue(player, "up")

  const handleDownQueue = () =>
    onEnqueue(player, "down")

  const showHeader = () => {
    if (container === "list") return (
      <>
        <div className="stat-i-sm">
          {index}
        </div>
        <div className="stat-sp"></div>
        <div className={queue ? "check-yes" : "check-no"} onClick={handleAddQueue}></div>
        <div className="stat-sp"></div>
      </>)
    if (container === "queue") return (
      <>
        <div className="stat-i-lg">
          {index}
        </div>
        <div className="check-x" onClick={handleAddQueue}></div>
        <div className="stat-arrows">
          <div className="arrow-up" onClick={handleUpQueue}></div>
          <div className="arrow-down" onClick={handleDownQueue}></div>
        </div>

      </>)
  }

  return (
    <div className={container === "list" ? "player-lg" : "player-sm"}>
      {showHeader()}
      <div className={container === "list" ? "stat-all-lg" : "stat-all-sm"} onClick={handleSetFocus}>
        <div className="stat-lg">
          <b>{player.temporaryDisplayName}</b>&nbsp;<i>({team.tricode})</i>
        </div>

        <div className="stat-sm">
          {player.pos}
        </div>
        <div className="stat-sp"></div>

        {container === "list" ? (
          <>
            <div className="stat-sm">
              {stat.gamesPlayed}
            </div>
            <div className="stat-sp"></div>
            <div className="stat-sm">
              {stat.fgp}
            </div>
            <div className="stat-sm">
              {stat.tpp}
            </div>
            <div className="stat-sm">
              {stat.ftp}
            </div>
            <div className="stat-sp"></div>
          </>
        ) : null}

        <div className="stat-sm">
          {stat.ppg}
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
        {container === "list" ? (
          <>
            <div className="stat-sp"></div>
            <div className="stat-sm">
              {stat.topg}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Player