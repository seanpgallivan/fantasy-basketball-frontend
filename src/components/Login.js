import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e =>
    this.setState({[e.target.name]: e.target.value})

  handleLogin = () =>
    this.props.onLogin(this.state)

  render() {
    let {username, password} = this.state
    return (
      <div className="main">
        <div className="box-container">
          <div className="login">
            <h2>Please Log In</h2>
            <input 
              style={{backgroundImage: "url('/icon_user.png')"}}
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <input 
              style={{backgroundImage: "url('/icon_password.png')"}}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <button onClick={this.handleLogin}>Log In</button>
            <h4>Not a user? Please <Link to="/signup">Sign Up</Link>!</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;