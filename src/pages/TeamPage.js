import React, {Component} from 'react';
import DraftLog from '../containers/DraftLog';
import DraftQueue from '../containers/DraftQueue';
import PlayerStats from '../components/PlayerStats'
import PlayerList from '../containers/PlayerList'


class TeamPage extends Component {
  state = {
    focus: null,
    filter: null,
    sort: "ppg"
  }

  componentDidMount() {

  }

  filterSort = () => {
    let {filter, sort} = this.state
    let {players} = this.props
    let filterSorted = Object.values(players).map(player => player)
    if (filter === "G") filterSorted.filter(player => player.pos.includes("G"))
    if (sort === "ppg") filterSorted.sort((a,b) => parseInt(b.stats.latest.ppg) - parseInt(a.stats.latest.ppg))
    if (sort === "pm") filterSorted.sort((a,b) => parseInt(b.stats.latest.plusMinus) - parseInt(a.stats.latest.plusMinus))
    return filterSorted
  }

  setFocus = player => 
    this.setState({focus: player})


  render() {
    let {players, franchises, league, team: {queue, roster}, onEnqueue} = this.props

    return (
      <div className="pane">
        <DraftLog
          players={players}
          franchises={franchises}
          league={league}
          onSetFocus={this.setFocus}
        />
        <DraftQueue
          players={players}
          franchises={franchises}
          queue={queue}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
        <PlayerStats
          focus={this.state.focus}
        />
        <PlayerList
          players={this.filterSort(players)}
          franchises={franchises}
          queue={queue}
          roster={roster}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
      </div>
    )
  }
}

export default TeamPage;