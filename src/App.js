import './App.css';
// import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import TeamPage from './pages/TeamPage'
import {api} from './services/api'

class App extends Component {
  state = {
    user: null,
    year: 2019,
    players: {},
    franchises: {},
    league: {},
    team: {
      queue: [],
      roster: []
    }
  }

  componentDidMount() {
    this.loadUser()
    this.loadStorage()
    this.loadTeam()
    this.loadLeague()
  }
  


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

  loadLeague = () =>
    api.server.getLeague(4)
      .then(data => this.setState({league: data}))

  loadTeam = () => 
    api.server.getTeam(1)
      .then(data => this.setState({team: data}))

  // User Management:
  login = data => {
    this.setState({user: data.user})
    localStorage.token = data.jwt
  }

  logout = () => {
    this.setState({user: null});
    localStorage.removeItem("token");
  };



  // Callbacks:
  loadAllData = () => {
    let year = this.state.year
    api.data.getPlayers(year)
      .then(({players, franchises}) => {
        let ids = Object.keys(players),
            statcount = ids.length
        ids.forEach(id => 
          api.data.getPlayerStats(year, id)
            .then(stats => {
              statcount--
              if (ids.length - statcount % 100 === 0) console.log("fetching player " + (ids.length - statcount) + " of " + ids.length)
              players[id].stats = stats
              if (statcount === 0) 
                this.setState({players: players, franchises: franchises}, this.setStorage)
            })
        )
      })
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
  }



  render() {
    let {user, players, franchises, league, team} = this.state
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

                  // take out when getting rid of the button
                  players={players}

                  franchises={franchises}
                  onLoadData={this.loadAllData}
                  />
              // )
            }
          />
          <Route path="/user/home" exact
            render={() =>
              <HomePage
                user={user}
              />
            }
          />
          <Route path="/user/draft" exact
            render={() =>
              <TeamPage
                players={players}
                franchises={franchises}
                league={league}
                team={team}
                onEnqueue={this.enqueue}
              />
            }
          />
        </>
      </Router>
    );
  }
}

export default App;