// My server backend calls:
const API_URL = "http://localhost:4000"

const token = () => localStorage.getItem("token")

const headers = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  })

const login = data =>
  fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json())

const getUser = () => 
  fetch(`${API_URL}/auth/user`, {
    headers: headers()
  }).then(r => r.json())

const postUser = user => 
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify(user)
  }).then(r => r.json())



// data.NBA.net calls via proxy:
const getTeams = year =>
  fetch(`/prod/v2/${year}/teams.json`)
    .then(r => r.json())
    .then(data => {
      let teams = {}
      data.league.standard.forEach(team => 
        team.isNBAFranchise ? teams[team.teamId] = team : null
      )
      return teams
    })

const getPlayers = year => 
  getTeams(year)
    .then(teams => 
      fetch(`/prod/v1/${year}/players.json`)
        .then(r => r.json())
        .then(data => {
          let players = []
          data.league.standard.forEach(player => 
            !!teams[player.teamId] ? players.push(player) : null
          )
          return {players: players, teams: teams}
        })
    )

const getPlayerStats = (year, personId) =>
  fetch(`/prod/v1/${year}/players/${personId}_profile.json`)
    .then(r => r.json())
    .then(data => data.league.standard.stats)

const getLeague = () => {

}
    
export const api = {
  auth: {
    login,
    getUser,
    postUser
  },
  data: {
    getPlayers,
    getPlayerStats,
    getLeague
  }
};