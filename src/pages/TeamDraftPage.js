import React, {Component} from 'react';
import DraftLog from '../containers/DraftLog';
import DraftQueue from '../containers/DraftQueue';
import PlayerStats from '../components/PlayerStats'
import PlayerList from '../containers/PlayerList'


class DraftPage extends Component {
  state = {
    focus: null,
    filter: null,
    sort: "ppg"
  }

  filterSort = () => {
    let {filter, sort} = this.state
    let {players, teams, stats} = this.props
    if (!players) return players
    let filterSorted = [...players]
    if (sort === "ppg") filterSorted.sort((a,b) => parseInt(stats[b.personId].latest.ppg) - parseInt(stats[a.personId].latest.ppg))
    if (sort === "pm") filterSorted.sort((a,b) => parseInt(stats[b.personId].latest.plusMinus) - parseInt(stats[a.personId].latest.plusMinus))
    return filterSorted
  }

  setFocus = player => 
    this.setState({focus: player})


  render() {
    let {players, teams, stats, queue, onEnqueue} = this.props

    return (
      <div className="pane">
        <DraftLog

        />
        <DraftQueue
          queue={queue}
          teams={teams}
          stats={stats}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
        <PlayerStats
          focus={this.state.focus}
        />
        <PlayerList
          players={this.filterSort(players)}
          teams={teams}
          stats={stats}
          queue={queue}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
      </div>
    )
  }
}

export default DraftPage;