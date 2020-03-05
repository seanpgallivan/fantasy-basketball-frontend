import React from 'react'

const Player = ({container, index, player, focus, elim, player: {stats: {latest}}, franchise, queued, onSetFocus, onEnqueue}) => {

  const handleSetFocus = () =>
    onSetFocus(player)

  const handleAddQueue = () => 
    onEnqueue(player.personId, "add")
  const handleUpQueue = () => 
    onEnqueue(player.personId, "up")
  const handleDownQueue = () =>
    onEnqueue(player.personId, "down")

  const showButtons = () => {
    if (container === "list" && elim) return <div className="check-elim"></div>
    if (container === "list") return <div className={queued ? "check-x" : "check-no"} onClick={handleAddQueue}></div>
    if (container === "queue") return (
      <>
        <div className="check-x icon-dbl" onClick={handleAddQueue}></div>
        <div className="stat-arrows">
          <div className="arrow-up" onClick={handleUpQueue}></div>
          <div className="arrow-down" onClick={handleDownQueue}></div>
        </div>
      </>
    )
  }

  return (
    <div className={container === "list" ? "player-lg" : "player-sm"}>
      <div className={container === "list" ? "stat-i-sm" : "stat-i-lg"}>
        {index}
      </div>
      {showButtons()}
      <div 
        className={
          (container === "list" ? "stat-all-lg" : "stat-all-sm") + 
          (elim && container !== "log" ? " dim" : "") + 
          (focus && focus.personId === player.personId ? " player-focus" : "")
        } 
        onClick={handleSetFocus}
      >
        <div 
          className={container === "list" ? "stat-logo-sm" : "stat-logo-lg"} 
          style={{backgroundImage: `url(https://www.nba.com/assets/logos/teams/primary/web/${franchise.tricode}.svg)`}}
        ></div>
        <div className={elim && elim.picked && container !== "log" ? "stat-lg line" : "stat-lg"}>
          <b>{player.temporaryDisplayName}</b>&nbsp;<i>({franchise.tricode})</i>
        </div>

        <div className={elim && !elim.picked && container !== "log" ? "stat-sm line" : "stat-sm"}>
          {player.pos}
        </div>
        <div className="stat-sp"></div>

        {container === "list" ? (
          <>
            <div className="stat-sm">
              {latest.gamesPlayed > 0 ? latest.gamesPlayed : '—'}
            </div>
            <div className="stat-sp"></div>
            <div className="stat-sm">
              {latest.fgp > 0 ? latest.fgp : '—'}
            </div>
            <div className="stat-sm">
              {latest.tpp > 0 ? latest.tpp : '—'}
            </div>
            <div className="stat-sm">
              {latest.ftp > 0 ? latest.ftp : '—'}
            </div>
            <div className="stat-sp"></div>
          </>
        ) : null}

        <div className="stat-sm">
          {latest.ppg > 0 ? latest.ppg : '—'}
        </div>
        <div className="stat-sm">
          {latest.apg > 0 ? latest.apg : '—'}
        </div>
        <div className="stat-sm">
          {latest.rpg > 0 ? latest.rpg : '—'}
        </div>
        <div className="stat-sm">
          {latest.spg > 0 ? latest.spg : '—'}
        </div>
        <div className="stat-sm">
          {latest.bpg > 0 ? latest.bpg : '—'}
        </div>
        {container === "list" ? (
          <>
            <div className="stat-sp"></div>
            <div className="stat-sm">
              {latest.topg > 0 ? latest.topg : '—'}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Player