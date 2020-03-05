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
    filterAmt: 50,
    sort: "ppg",
    sortDir: 1,
    filterSorted: [],
    refilter: true
  }

  componentDidMount() {
    if (!this.props.team.id) this.props.history.push('/user/home')
  }


  filterSort = () => {
    let {players, team: {queue}, franchises, elims} = this.props
    let {filter, filterAmt, sort, sortDir} = this.state
    let filterSorted = Object.values(players)
    
    if (filter === "G") filterSorted = filterSorted.filter(player => player.pos.includes("G"))
    if (filter === "F") filterSorted = filterSorted.filter(player => player.pos.includes("F"))
    if (filter === "C") filterSorted = filterSorted.filter(player => player.pos.includes("C"))


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
    if (filterSorted.length > 0) this.setState({filterSorted: filterSorted, refilter: false})
  }

  topPick = () => {
    let {elims, team: {queue}} = this.props
    let top = queue.find(id => !elims[id])
    let topP = this.state.filterSorted.find(player => !elims[player.personId])
    if (topP && !top) top = topP.personId
    return top
  }

  setFocus = player => 
    this.setState({focus: player, seasons: false})

  setSort = value => {
    let {filter, sort, sortDir} = this.state
    if (value === "pos") {
      if (!filter) this.setState({filter: "G", filterAmt: 50, refilter: true})
      if (filter === "G") this.setState({filter: "F", filterAmt: 50, refilter: true})
      if (filter === "F") this.setState({filter: "C", filterAmt: 50, refilter: true})
      if (filter === "C") this.setState({filter: null, filterAmt: 50, refilter: true})
    } else if (value === sort) {
      this.setState({sortDir: sortDir + 1, refilter: true})
    } else {
      this.setState({sort: value, sortDir: 1, filterAmt: 50, refilter: true})
    }
  }

  expandSeasons = () =>
    this.setState(prev => ({seasons: !prev.seasons}))

  morePlayers = () => 
    this.setState(prev => ({filterAmt: prev.filterAmt + 50}))



  render() {
    let {players, elims, franchises, league, team, team: {queue, roster}, onEnqueue, onDraftPlayer} = this.props
    let {filterAmt, filterSorted, refilter, focus, seasons, top} = this.state

    return (
      <div className="pane">
        {refilter || elims[top] ? this.filterSort() : null}
        <DraftLog
          players={players}
          focus={focus}
          elims={elims}
          top={this.topPick()}
          franchises={franchises}
          league={league}
          team={team}
          onSetFocus={this.setFocus}
          onDraftPlayer={onDraftPlayer}
        />
        <DraftQueue
          players={players}
          focus={focus}
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
          players={filterSorted.slice(0,filterAmt)}
          more={Object.keys(players).length - filterAmt}
          focus={focus}
          elims={elims}
          franchises={franchises}
          queue={queue}
          roster={roster}
          onSetSort={this.setSort}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
          onMorePlayers={this.morePlayers}
        />
      </div>
    )
  }
}

export default TeamPage;