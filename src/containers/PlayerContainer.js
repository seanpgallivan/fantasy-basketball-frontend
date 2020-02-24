import React, {Component} from 'react';
import PlayerStats from '../components/PlayerStats'
import PlayerList from './PlayerList'

class PlayerContainer extends Component {
  state = {
    focus: null,
    filter: null,
    sort: "ppg"
  }

  componentDidMount() {
    // let {players, teams, stats} = this.props
    // let updated = players.map(player => {
    //   let team = teams[player.personId]
    //   let stat = stats[player.personId]
    //   return {
    //     ...stat,
    //     name: player.temporaryDisplayName,
    //     personId: player.personId,
    //     team: team.fullName,
    //     teamcode: team.tricode
    //   }
    // })
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


  // Callbacks:
  setFocus = player => 
    this.setState({focus: player})



  render() {
    let {players, teams, stats, queue, onLoadPlayers, onLoadStats, onEnqueue} = this.props

    return (
      <>
        <PlayerStats
          focus={this.state.focus}
        />
        <PlayerList
          players={this.filterSort(players)}
          teams={teams}
          stats={stats}
          queue={queue}
          onLoadPlayers={onLoadPlayers}
          onLoadStats={onLoadStats}
          onSetFocus={this.setFocus}
          onEnqueue={onEnqueue}
        />
      </>
    );
  }
}

export default PlayerContainer;