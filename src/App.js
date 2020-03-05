import './App.css';
// import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LeaguePage from './pages/LeaguePage'
import TeamPage from './pages/TeamPage'
import {api} from './services/api'

class App extends Component {
  state = {
    user: null,
    team: {
      queue: [],
      roster: []
    },
    year: 2019,
    players: {},
    franchises: {},
  }

  componentDidMount() {
    this.loadUser()
    this.loadStorage()
  }
  

  // Chat listener will collect information about draft turns naturally, should prompt next turn



  // Load Helpers:
  loadUser = () => {
    if (localStorage.token) api.auth.getUser()
      .then(data => {
        if (data.error) {
          console.log(data.error)
          localStorage.removeItem("token")
        } else {
          this.setState({user: data.user})
          localStorage.token = data.jwt
        }
      })
  }
  loadStorage = () => 
    localStorage.data ? this.setState(JSON.parse(localStorage.data)) : null
  setStorage = () => {
    let {players, franchises} = this.state
    localStorage.data = JSON.stringify({players: players, franchises: franchises})
  }

  // Take the below out:
  switchLeague = () =>
    {}
    // api.server.getLeague(this.state.league.id % 4 + 1)
    //   .then(leagueData => 
    //     api.server.getTeam(leagueData.teams[0].id)
    //       .then(teamData => 
    //         this.setState({league: leagueData, team: teamData},
    //           this.resetDraft
    //         )
    //       )
    //   )
  resetDraft = () => {
    // let {league, league: {teams}} = this.state
    // let count = teams.length
    // teams.forEach(tm => {
    //   count--
    //   api.server.patchTeam({id: tm.id, team: {roster: []}})
    //     .then(() => {
    //       if (count === 0) 
    //         api.server.getLeague(league.id)
    //           .then(leagueData => 
    //             api.server.getTeam(leagueData.teams[0].id)
    //               .then(teamData => 
    //                 this.setState({league: leagueData, team: teamData})
    //               )
    //           )
    //     })
    // })
  }
  // Take the above out:


  // User Management:
  login = data => {
    this.setState({user: data.user})
    localStorage.token = data.jwt
  }
  logout = () => {
    this.setState({
      user: null, 
      team: {
        queue: [],
        roster: []
      }
    });
    localStorage.removeItem("token");
  };



  // Helpers:
  findLeague = (id=this.state.team.leagueId) => 
    this.state.user.leagues.find(leag => leag.id === id)

  elimPlayers = () => {
    let {user, team, players} = this.state
    let {rost_g, rost_f, rost_c, rost_u, rost_b, max_players, teams} = this.findLeague()
    let {roster} = team
    let avail = {}, pos, nonPos, posCount, next
    if (rost_g > 0) avail.G = rost_g
    if (rost_f > 0) avail.F = rost_f
    if (rost_c > 0) avail.C = rost_c
    if (rost_u + rost_b > 0) avail.U = rost_u + rost_b
    let posit = roster.map(id => players[id].pos.split('-').sort().join(''))
    console.log(posit)
    console.log(avail)
    console.log("-----start-----")
    posit.sort((a,b) => a.length - b.length)
    while (posit[0] && posit[0].length === 1 && Object.values(avail).reduce((a,n) => a+n,0) > 0) {
      pos = posit.shift()
      avail[pos] > 0 ? avail[pos]-- : avail.U--
      Object.keys(avail).forEach(aP => {
        if (avail[aP] === 0) posit = posit.map(pos => pos.length > 1 ? pos.replace(aP,'') : pos)
      })
      posit.sort((a,b) => a.length - b.length)
      console.log(posit)
      console.log(avail)
    }
    console.log("-----mid-----")
    for (const key in avail) {
      nonPos = posit.filter(pos => !pos.includes(key))
      posCount = posit.length - nonPos.length
      if (0 < posCount && posCount < avail[key]) {
        avail[key] = avail[key] - posCount
        posit = nonPos
      }
    }
    console.log(posit)
    console.log(avail)
    console.log("-----last-----")
    posit = posit.reduce((acc, pos) => ({...acc, [pos]: acc[pos] ? acc[pos] + 1 : 1}), {})
    console.log(posit)
    console.log(avail)
    while (Object.values(posit).reduce((a,n) => a+n,0) > 0 && (avail.G + avail.U > 1 || avail.F + avail.U > 1 || avail.C + avail.U > 1)) {
      if (Object.values({GF:0, FC:0, CG:0, ...posit}).every(val => val === Object.values(posit)[0])) {
        console.log({...avail, U: 0})
        console.log(Object.keys({...avail, U: 0}))
        next = Object.keys({...avail, U: 0}).slice(0,3).reduce((a,b) => avail[a] > avail[b] ? a : b)
        console.log(next)
        posit[Object.keys(posit).find(pos => pos.includes(next))]--
        avail[next]--
      } else {
        next = Object.keys(posit).reduce((a,b) => posit[a] > posit[b] ? a : b)
        console.log(next)
        if (avail[next[0]] > avail[next[1]]) {
          avail[next[0]]--
        } else if (avail[next[1]] > 0) {
          avail[next[1]]--
        } else {
          avail.U--
        }
        posit[next]--
      }
      console.log(posit)
      console.log(avail)
    }
    if (Object.values(posit).includes(2)) {
      next = Object.keys(posit)[0]
      avail[next[0]]--
      avail[next[1]]--
    } 
    console.log("-----result-----")
    console.log(avail)
    let result = "GFC"
    if (Object.keys(avail).length > 0 && Object.values(avail).reduce((a,b)=>a+b) > 0) 
      result = (avail.G + avail.U > 0 ? "G" : "") + (avail.F + avail.U > 0 ? "F" : "") + (avail.C + avail.U > 0 ? "C" : "")
    console.log(result)
    let elims = {}
    if (result.length < 3) Object.values(players).forEach(pl => {
        if (!result.includes(pl.pos[0]) && !result.includes(pl.pos[2])) {
          if (!elims[pl.personId]) elims[pl.personId] = {}
          elims[pl.personId].pos = true
        }
    })
    let allRosters = teams.reduce((acc, tm) => acc.concat(tm.roster),[])
    allRosters.forEach(id => {
      if (!elims[id]) elims[id] = {}
      elims[id].picked = true
    })
    return elims
  }
  


  // Callbacks:
  // loadAllData = () => {
  //   let year = this.state.year
  //   api.data.getPlayers(year)
  //     .then(({players, franchises}) => {
  //       let ids = Object.keys(players),
  //           statcount = ids.length
  //       ids.forEach(id => 
  //         api.data.getPlayerStats(year, id)
  //           .then(stats => {
  //             statcount--
  //             if ((ids.length - statcount) % 100 === 0) console.log("fetching player " + (ids.length - statcount) + " of " + ids.length)
  //             players[id].stats = stats
  //             if (statcount === 0) 
  //               this.setState({players: players, franchises: franchises}, this.setStorage)
  //           })
  //       )
  //     })
  // }

  leagueView = (id, history, route) => {
    let team = this.findLeague(id).teams.find(tm => tm.user_id === this.state.user.id)
    this.setState({team: {...team, leagueId: id}},
      history.push('/user/' + route)
    )
  }
  enqueue = (queueId, action) => {
    let {team, team: {id, queue}} = this.state
    let i = queue.findIndex(playerId => playerId === queueId)
    if (action === "add" && i < 0) queue.push(queueId)
    if (action === "add" && i >= 0) queue = queue.filter(playerId => playerId !== queueId)
    if (action === "up" && i > 0) [queue[i - 1], queue[i]] = [queue[i], queue[i - 1]]
    if (action === "down" && i < queue.length - 1) [queue[i + 1], queue[i]] = [queue[i], queue[i + 1]]
    this.setState({team: {...team, queue: queue}})
    api.server.patchTeam({id: id, team: {queue: queue}})
      .then(this.loadUser)
  }

  draftPlayer = playerId => {
    let {team, team: {id, roster}} = this.state
    roster.push(playerId)
    this.setState({team: {...team, roster: roster}})
    api.server.patchTeam({id: id, team: {roster: roster}})
      .then(this.loadUser)
  }



  render() {
    let {user, players, franchises, team} = this.state
    let league = team.id ? this.findLeague() : {}
    return (
      <Router>
        <>
          <Route path="/" exact
            render={() =>
              <MainPage

              />
            }
          />
          <Route path="/login" exact
            render={props =>
              <LoginPage
                {...props}
                user={user}
                onLogin={this.login}
              />
            }
          />
          <Route path="/signup" exact
            render={props =>
              <SignupPage
                {...props}
                onLogin={this.login}
              />
            }
          />
          <Route path="/user"
            render={props =>
              // !user ? <Redirect to="/login"/> : (
                <NavBar
                  {...props}
                  onLogout={this.logout}
                  user={user}

                  // take out when getting rid of the button
                  players={players}
                  league={league}
                  team={team}
                  onLoadTeam={this.loadTeam}
                  onLoadData={this.loadAllData}
                  onResetDraft={this.resetDraft}
                  />
              // )
            }
          />
          <Route path="/user/home" exact
            render={props =>
              <HomePage
                {...props}
                user={user}
                onLeagueView={this.leagueView}
              />
            }
          />
          <Route path="/user/league" exact
            render={() =>
              <LeaguePage
                user={user}
              />
            }
          />
          <Route path="/user/team" exact
            render={props =>
              <TeamPage
                {...props}
                players={players}
                elims={user && team.id ? this.elimPlayers() : {}}
                franchises={franchises}
                league={league}
                team={team}
                onEnqueue={this.enqueue}
                onDraftPlayer={this.draftPlayer}
              />
            }
          />
        </>
      </Router>
    );
  }
}

export default App;