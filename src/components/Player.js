import React from 'react'

const Player = ({container, index, player, franchise, queued, onSetFocus, onEnqueue}) => {

  const handleSetFocus = () =>
    onSetFocus(player)

  const handleAddQueue = () => 
    onEnqueue(player.personId, "add")

  const handleUpQueue = () => 
    onEnqueue(player.personId, "up")

  const handleDownQueue = () =>
    onEnqueue(player.personId, "down")

  const showHeader = () => {
    if (container === "list") return (
      <>
        <div className="stat-i-sm">
          {index}
        </div>
        <div className="stat-sp"></div>
        <div className={queued ? "check-yes" : "check-no"} onClick={handleAddQueue}></div>
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
          <b>{player.temporaryDisplayName}</b>&nbsp;<i>({franchise.tricode})</i>
        </div>

        <div className="stat-sm">
          {player.pos}
        </div>
        <div className="stat-sp"></div>

        {container === "list" ? (
          <>
            <div className="stat-sm">
              {player.stats.latest.gamesPlayed}
            </div>
            <div className="stat-sp"></div>
            <div className="stat-sm">
              {player.stats.latest.fgp}
            </div>
            <div className="stat-sm">
              {player.stats.latest.tpp}
            </div>
            <div className="stat-sm">
              {player.stats.latest.ftp}
            </div>
            <div className="stat-sp"></div>
          </>
        ) : null}

        <div className="stat-sm">
          {player.stats.latest.ppg}
        </div>
        <div className="stat-sm">
          {player.stats.latest.apg}
        </div>
        <div className="stat-sm">
          {player.stats.latest.rpg}
        </div>
        <div className="stat-sm">
          {player.stats.latest.spg}
        </div>
        <div className="stat-sm">
          {player.stats.latest.bpg}
        </div>
        {container === "list" ? (
          <>
            <div className="stat-sp"></div>
            <div className="stat-sm">
              {player.stats.latest.topg}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Player