import './App.css';
// import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import NavBar from './components/NavBar'
import Home from './components/Home'
import {api} from './services/api'

class App extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    if (localStorage.getItem("token")) api.auth.getUser()
      .then(data => {
        if (data.error) {
          console.log(data.error)
          localStorage.removeItem("token")
        } else {
          this.setState({user: data.user})
          localStorage.setItem("token", data.jwt)
        }
      })
  }
  

  // User Management:
  login = data => {
    this.setState({user: data.user})
    localStorage.setItem("token", data.jwt)
  }
  logout = () => {
    this.setState({user: null});
    localStorage.removeItem("token");
  };




  render() {
    let {user} = this.state
    return (
      <Router>
        <>
          <Route path="/" exact
            render={() =>
              <Main

              />
            }
          />
          <Route path="/login" exact
            render={props =>
              <Login
                {...props}
                onLogin={this.login}
              />
            }
          />
          <Route path="/signup" exact
            render={props =>
              <Signup
                {...props}
                onLogin={this.login}
              />
            }
          />
          <Route path="/user"
            render={() =>
              !user ? <Redirect to="/login"/> : (
                <NavBar

                />
              )
            }
          />
          <Route path="/user/home" exact
            render={() =>
              <Home

              />
            }
          />
        </>
      </Router>
    );
  }
}

export default App;