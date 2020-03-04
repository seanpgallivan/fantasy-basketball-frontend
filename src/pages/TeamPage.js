import React, {Component} from 'react';
import DraftLog from '../containers/DraftLog';
import DraftQueue from '../containers/DraftQueue';
import PlayerStats from '../components/PlayerStats'
import PlayerList from '../containers/PlayerList'


class TeamPage extends Component {
  state = {
    focus: null,
    seasons: false,
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


    // DON'T USE PARSEINT, drops to integer
    if (sort ==="name" && sortDir % 2 === 1) filterSorted.sort((a,b) => b.temporaryDisplayName > a.temporaryDisplayName ? -1 : 1)
    if (sort ==="name" && sortDir % 2 === 0) filterSorted.sort((a,b) => b.temporaryDisplayName > a.temporaryDisplayName ? 1 : -1)
    if (sort ==="team" && sortDir % 2 === 1) filterSorted.sort((a,b) => franchises[b.teamId].tricode > franchises[a.teamId].tricode ? -1 : 1)
    if (sort ==="team" && sortDir % 2 === 0) filterSorted.sort((a,b) => franchises[b.teamId].tricode > franchises[a.teamId].tricode ? 1 : -1)
    if (sort ==="gp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.gamesPlayed) < parseFloat(a.stats.latest.gamesPlayed) ? -1 : 1)
    if (sort ==="gp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.gamesPlayed) < parseFloat(a.stats.latest.gamesPlayed) ? 1 : -1)
    if (sort ==="fgp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.fgp) < parseFloat(a.stats.latest.fgp) ? -1 : 1)
    if (sort ==="fgp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.fgp) < parseFloat(a.stats.latest.fgp) ? 1 : -1)
    if (sort ==="tpp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.tpp) < parseFloat(a.stats.latest.tpp) ? -1 : 1)
    if (sort ==="tpp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.tpp) < parseFloat(a.stats.latest.tpp) ? 1 : -1)
    if (sort ==="ftp" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.ftp) < parseFloat(a.stats.latest.ftp) ? -1 : 1)
    if (sort ==="ftp" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.ftp) < parseFloat(a.stats.latest.ftp) ? 1 : -1)
    if (sort ==="ppg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.ppg) < parseFloat(a.stats.latest.ppg) ? -1 : 1)
    if (sort ==="ppg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.ppg) < parseFloat(a.stats.latest.ppg) ? 1 : -1)
    if (sort ==="apg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.apg) < parseFloat(a.stats.latest.apg) ? -1 : 1)
    if (sort ==="apg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.apg) < parseFloat(a.stats.latest.apg) ? 1 : -1)
    if (sort ==="rpg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.rpg) < parseFloat(a.stats.latest.rpg) ? -1 : 1)
    if (sort ==="rpg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.rpg) < parseFloat(a.stats.latest.rpg) ? 1 : -1)
    if (sort ==="spg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.spg) < parseFloat(a.stats.latest.spg) ? -1 : 1)
    if (sort ==="spg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.spg) < parseFloat(a.stats.latest.spg) ? 1 : -1)
    if (sort ==="bpg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.bpg) < parseFloat(a.stats.latest.bpg) ? -1 : 1)
    if (sort ==="bpg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.bpg) < parseFloat(a.stats.latest.bpg) ? 1 : -1)
    if (sort ==="topg" && sortDir % 2 === 1) filterSorted.sort((a,b) => parseFloat(b.stats.latest.topg) > parseFloat(a.stats.latest.topg) ? -1 : 1)
    if (sort ==="topg" && sortDir % 2 === 0) filterSorted.sort((a,b) => parseFloat(b.stats.latest.topg) > parseFloat(a.stats.latest.topg) ? 1 : -1)

    // if (sort === "pm") filterSorted.sort((a,b) => parseInt(b.stats.latest.plusMinus) - parseInt(a.stats.latest.plusMinus) ? -1 : 1))
    return filterSorted
  }

  topPlayer = () => 
    Object.keys(this.props.players).length > 0 ? this.filterSort().find(player => !this.props.elims[player.personId]).personId : "201939"

  setFocus = player => 
    this.setState({focus: player, seasons: true})

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

  expandSeasons = () =>
    this.setState(prev => ({seasons: !prev.seasons}))



  render() {
    let {players, elims, franchises, league, team, team: {queue, roster}, onEnqueue, onDraftPlayer} = this.props
    let {focus, seasons} = this.state

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
          seasons={seasons}
          franchises={franchises}
          onExpandSeasons={this.expandSeasons}
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