const API_URL = "http://localhost:4000"

const token = () => localStorage.getItem("token")

const headers = () => ({
    "Content-Type": "application/json",
    Accepts: "application/json",
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

const getLeague = () => {
  
}


export const api = {
  auth: {
    login,
    getUser,
    postUser
  },
  data: {
    getLeague
  }
};