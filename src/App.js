import './App.css';
// import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DraftPage from './pages/DraftPage'
import {api} from './services/api'

class App extends Component {
  state = {
    user: null,
    year: 2019,
    players: null,
    teams: null,
    stats: null,
    queue: []
  }

  componentDidMount() {
    this.loadUser()
    this.loadStorage()
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
    let {players, teams, stats} = this.state
    localStorage.data = JSON.stringify({players: players, teams: teams, stats: stats})
  }



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
  loadPlayers = () => 
    api.data.getPlayers(this.state.year)
      .then(data => {
        this.setState(data)
        this.setStorage()
      })

  loadStats = () => {
    let {year, players} = this.state
    let stats = {}
    players.forEach(player =>
      api.data.getPlayerStats(year, player.personId)
        .then(stat => {
          stats[player.personId] = stat
          if (Object.keys(stats).length === players.length) {
            this.setState({stats: stats})
            this.setStorage()
          }
        })
    )
  }

  enqueue = player => 
    this.setState(prev => ({queue: [...prev.queue, player]}))


  render() {
    let {user, players, teams, stats, queue} = this.state
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
              <DraftPage
                players={players}
                teams={teams}
                stats={stats}
                queue={queue}
                onLoadPlayers={this.loadPlayers}
                onLoadStats={this.loadStats}
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