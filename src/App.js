import './App.css';
// import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Main from './components/Main'
import Login from './components/Login'
import Signup from './components/Signup'
import NavBar from './components/NavBar'
import Home from './components/Home'


class App extends Component {
  state = {
    user: null
  }


  // User Management
  login = user => {

  }

  signup = user => {

  }



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
            render={() =>
              <Login
                onLogin={this.login}
              />
            }
          />
          <Route path="/signup" exact
            render={() =>
              <Signup
                onSignup={this.signup}
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
          <Route path="/user" exact
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