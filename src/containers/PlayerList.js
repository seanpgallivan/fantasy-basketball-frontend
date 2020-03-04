import React from 'react'
import Player from '../components/Player'

const PlayerList = ({players, elims, franchises, focus, queue, onSetSort, onSetFocus, onEnqueue}) => {

  const showPlayers = () => 
    players ? players.map((player, index) => 
      <Player 
        key={player.personId}
        container="list"
        index={index + 1}
        player={player}
        elim={elims[player.personId]}
        franchise={franchises[player.teamId]}
        queued={queue.includes(player.personId)}
        onSetFocus={onSetFocus}
        onEnqueue={onEnqueue}
      />
      ) : null

  const handleFilter = e => 
    onSetSort(e.target.getAttribute('name'))



  return (
    <div className="player-list content">
      <div className="player-list-header">
        <h1>Player List</h1>
      </div>
      <div className="player-list-box">
        <div className="player-lg-header">
          <div className="stat-header-sp"></div>
          <div className="stat-name" onClick={handleFilter} name="name" title="Name">Name</div>
          <div className="stat-team" onClick={handleFilter} name="team" title="(TEAM)">(TEAM)</div>
          <div className="stat-header-sp2"></div>
          <div className="stat-sm" onClick={handleFilter} name="pos" title="Position">POS</div>
          <div className="stat-sp"></div>
          <div className="stat-sm" onClick={handleFilter} name="gp" title="Games Played">GP</div>
          <div className="stat-sp"></div>
          <div className="stat-sm" onClick={handleFilter} name="fgp" title="Field Goal Percentage">FG%</div>
          <div className="stat-sm" onClick={handleFilter} name="tpp" title="Three Point Percentage">3P%</div>
          <div className="stat-sm" onClick={handleFilter} name="ftp" title="Free Throw Percentage">FT%</div>
          <div className="stat-sp"></div>
          <div className="stat-sm" onClick={handleFilter} name="ppg" title="Points Per Game">P/G</div>
          <div className="stat-sm" onClick={handleFilter} name="apg" title="Assists Per Game">A/G</div>
          <div className="stat-sm" onClick={handleFilter} name="rpg" title="Rebounds Per Game">R/G</div>
          <div className="stat-sm" onClick={handleFilter} name="spg" title="Steals Per Game">S/G</div>
          <div className="stat-sm" onClick={handleFilter} name="bpg" title="Blocks Per Game">B/G</div>
          <div className="stat-sp"></div>
          <div className="stat-sm" onClick={handleFilter} name="topg" title="Turnovers Per Game">TO/G</div>
        </div>
        {showPlayers()}
        <div className="player-lg-buff"></div>
      </div>
    </div>
  )
}

export default PlayerList