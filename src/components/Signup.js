import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Signup extends Component {
  state = {
    username: "",
    firstname: "",
    lastname: "",
    password: ""
  }

  handleChange = e =>
    this.setState({[e.target.name]: e.target.value})

  handleSignup = () =>
    this.props.onSignup(this.state)

  render() {
    let {username, firstname, lastname, password} = this.state
    return (
      <div className="main">
        <div className="box-container">
          <div className="login">
            <h2>Please Sign Up</h2>
            <input 
              style={{backgroundImage: "url('/icon_user.png')"}}
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={this.handleChange}
            />
            <input 
              style={{backgroundImage: "url('/icon_name.png')"}}
              type="text"
              name="firstname"
              placeholder="first name"
              value={firstname}
              onChange={this.handleChange}
            />
            <input 
              style={{backgroundImage: "url('/icon_name.png')"}}
              type="text"
              name="lastname"
              placeholder="last name"
              value={lastname}
              onChange={this.handleChange}
            />
            <input 
              style={{backgroundImage: "url('/icon_password.png')"}}
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSignup}>Sign Up</button>
            <h4>Already registered? Please <Link to="/login">Log In</Link> instead!</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;