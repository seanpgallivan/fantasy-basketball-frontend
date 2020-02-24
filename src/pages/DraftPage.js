import React, {Component} from 'react';
import DraftLog from '../containers/DraftLog';
import DraftQueue from '../containers/DraftQueue';
import PlayerContainer from '../containers/PlayerContainer';

const DraftPage = ({players, teams, stats, queue, onLoadPlayers, onLoadStats, onEnqueue}) => {

  return (
    <div className="pane">
      <DraftLog

      />
      <DraftQueue

      />
      <PlayerContainer
        players={players}
        teams={teams}
        stats={stats}
        queue={queue}
        onLoadPlayers={onLoadPlayers}
        onLoadStats={onLoadStats}
        onEnqueue={onEnqueue}
      />
    </div>
  )
}

export default DraftPage;