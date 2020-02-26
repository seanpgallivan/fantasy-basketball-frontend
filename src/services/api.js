// Basic Definitions:
const API_URL = "http://localhost:4000"

const headers = () => ({
  "Content-Type": "application/json",
  Accept: "application/json"
})
const token = () => localStorage.getItem("token")
const auth_headers = () => ({
  ...headers(),
  Authorization: token()
})



// Auth Fetches:
const login = data =>
  fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: auth_headers(),
    body: JSON.stringify(data)
  }).then(r => r.json())
const getUser = () => 
  fetch(`${API_URL}/auth/user`, {
    headers: auth_headers()
  }).then(r => r.json())
const postUser = user => 
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(user)
  }).then(r => r.json())



// data.NBA.net Fetches (via Proxy):
const getFranchises = year =>
  fetch(`/prod/v2/${year}/teams.json`)
    .then(r => r.json())
    .then(data => {
      let franchises = {}
      data.league.standard.forEach(franchise => 
        franchise.isNBAFranchise ? franchises[franchise.teamId] = franchise : null
      )
      return franchises
    })
const getPlayers = year => 
  getFranchises(year)
    .then(franchises => 
      fetch(`/prod/v1/${year}/players.json`)
        .then(r => r.json())
        .then(data => {
          let players = {}
          data.league.standard.forEach(player => 
            !!franchises[player.teamId] ? players[player.personId] = player : null
          )
          return {players: players, franchises: franchises}
        })
    )
const getPlayerStats = (year, personId) =>
  fetch(`/prod/v1/${year}/players/${personId}_profile.json`)
    .then(r => r.json())
    .then(data => data.league.standard.stats)




// Server Fetches:
const getLeague = id => 
  fetch(`${API_URL}/leagues/${id}`, {
    headers: auth_headers()
  }).then(r => r.json())
const getTeam = id => 
  fetch(`${API_URL}/teams/${id}`, {
    headers: auth_headers()
  }).then(r => r.json())
const patchTeam = team =>
  fetch(`${API_URL}/teams/${team.id}`, {
    method: "PATCH",
    headers: auth_headers(),
    body: JSON.stringify(team)
  }).then(r => r.json())
  
  
export const api = {
  auth: {
    login,
    getUser,
    postUser
  },
  data: {
    getPlayers,
    getPlayerStats
  },
  server: {
    getLeague,
    getTeam,
    patchTeam
  }
};