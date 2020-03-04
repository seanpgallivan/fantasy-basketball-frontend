import React, {Component} from 'react';
import DraftLog from '../containers/DraftLog';
import DraftQueue from '../containers/DraftQueue';
import PlayerStats from '../components/PlayerStats'
import PlayerList from '../containers/PlayerList'


class TeamPage extends Component {
  state = {
    focus: null,
    filter: null,
    sort: "ppg",
    sortDir: 1
  }

  filterSort = () => {
    let {players, franchises} = this.props
    let {filter, sort, sortDir} = this.state
    let filterSorted = Object.values(players)
    
    if (filter === "G") filterSorted = filterSorted.filter(player => player.pos.includes("G"))
    if (filter === "F") filterSorted = filterSorted.filter(player => player.pos.includes("F"))
    if (filter === "C") filterSorted = filterSorted.filter(player => player.pos.includes("C"))

    if (sort ==="name" && sortDir % 2 === 1) filterSorted.sort((a,b) => b.temporaryDisplayName > a.temporaryDisplayName ? -1 : 1)
    if (sort ==="name" && sortDir % 2 === 0) filterSorted.sort((a,b) => b.temporaryDisplayName > a.temporaryDisplayName ? 1 : -1)
    if (sort ==="team" && sortDir % 2 === 1) filterSorted.sort((a,b) => franchises[b.teamId].tricode > franchises[a.teamId].tricode ? -1 : 1)
    if (sort ==="team" && sortDir % 2 === 0) filterSorted.sort((a,b) => franchises[b.teamId].tricode > franchises[a.teamId].tricode ? 1 : -1)
    if (sort ==="gp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.gamesPlayed) < parseInt(a.stats.latest.gamesPlayed) ? -1 : 1)
    if (sort ==="gp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.gamesPlayed) < parseInt(a.stats.latest.gamesPlayed) ? 1 : -1)
    if (sort ==="fgp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.fgp) < parseInt(a.stats.latest.fgp) ? -1 : 1)
    if (sort ==="fgp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.fgp) < parseInt(a.stats.latest.fgp) ? 1 : -1)
    if (sort ==="tpp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.tpp) < parseInt(a.stats.latest.tpp) ? -1 : 1)
    if (sort ==="tpp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.tpp) < parseInt(a.stats.latest.tpp) ? 1 : -1)
    if (sort ==="ftp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.ftp) < parseInt(a.stats.latest.ftp) ? -1 : 1)
    if (sort ==="ftp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.ftp) < parseInt(a.stats.latest.ftp) ? 1 : -1)
    if (sort ==="ppg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.ppg) < parseInt(a.stats.latest.ppg) ? -1 : 1)
    if (sort ==="ppg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.ppg) < parseInt(a.stats.latest.ppg) ? 1 : -1)
    if (sort ==="apg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.apg) < parseInt(a.stats.latest.apg) ? -1 : 1)
    if (sort ==="apg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.apg) < parseInt(a.stats.latest.apg) ? 1 : -1)
    if (sort ==="rpg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.rpg) < parseInt(a.stats.latest.rpg) ? -1 : 1)
    if (sort ==="rpg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.rpg) < parseInt(a.stats.latest.rpg) ? 1 : -1)
    if (sort ==="spg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.spg) < parseInt(a.stats.latest.spg) ? -1 : 1)
    if (sort ==="spg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.spg) < parseInt(a.stats.latest.spg) ? 1 : -1)
    if (sort ==="bpg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.bpg) < parseInt(a.stats.latest.bpg) ? -1 : 1)
    if (sort ==="bpg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.bpg) < parseInt(a.stats.latest.bpg) ? 1 : -1)
    if (sort ==="topg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseInt(b.stats.latest.topg) > parseInt(a.stats.latest.topg) ? -1 : 1)
    if (sort ==="topg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseInt(b.stats.latest.topg) > parseInt(a.stats.latest.topg) ? 1 : -1)

    // if (sort === "pm") filterSorted.sort((a,b) => parseInt(b.stats.latest.plusMinus) - parseInt(a.stats.latest.plusMinus) ? -1 : 1))
    return filterSorted
  }

  topPlayer = () => 
    Object.keys(this.props.players).length > 0 ? this.filterSort().find(player => !this.props.elims[player.personId]).personId : "201939"

  setFocus = player => 
    this.setState({focus: player})

  setSort = value => {
    let {filter, sort, sortDir} = this.state
    if (value === "pos") {
      if (!filter) this.setState({filter: "G"})
      if (filter === "G") this.setState({filter: "F"})
      if (filter === "F") this.setState({filter: "C"})
      if (filter === "C") this.setState({filter: null})
    } else if (value === sort) {
      this.setState({sortDir: sortDir + 1})
    } else {
      this.setState({sort: value, sortDir: 1})
    }
  }



  render() {
    let {players, elims, franchises, league, team, team: {queue, roster}, onEnqueue, onDraftPlayer} = this.props
    let {focus} = this.state

    return (
      <div className="pane">
        <DraftLog
          players={players}
          elims={elims}
          top={this.topPlayer()}
          franchises={franchises}
          league={league}
          team={team}
          onSetFocus={this.setFocus}
          onDraftPlayer={onDraftPlayer}
        />
        <DraftQueue
          players={players}
          elims={elims}
          franchises={franchises}
          queue={queue}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
        <PlayerStats
          focus={focus}
          franchise={focus ? franchises[focus.teamId] : null}
        />
        <PlayerList
          players={this.filterSort(players)}
          elims={elims}
          franchises={franchises}
          queue={queue}
          roster={roster}
          onSetSort={this.setSort}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
      </div>
    )
  }
}

export default TeamPage;