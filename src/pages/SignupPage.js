import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {api} from '../services/api'

class SignupPage extends Component {
  state = {
    form: {
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      password_confirmation: ""
    },
    error: false
  }

  handleChange = e => {
    let form = {...this.state.form, [e.target.name]: e.target.value}
    this.setState({form: form})
  }

  handleSignup = e => {
    e.preventDefault()
    api.auth.postUser({user: this.state.form})
      .then(data => {
        if (data.error) {
          console.log(data.error)
          this.setState({error: true});
        } else {
          this.props.onLogin(data)
          this.props.history.push('/user/home');
        }
    })
  }

  disableButton = () => {
    let {username, firstname, lastname, password, password_confirmation} = this.state.form
    return !(password === password_confirmation && username && firstname && lastname && password && password_confirmation)
  }

  render() {
    let {username, firstname, lastname, password, password_confirmation} = this.state.form
    return (
      <div className="main">
        <div className="box-container">
          <div className="login">
            <h2>Please Sign Up</h2>
            <form onSubmit={this.handleSignup}>
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
              <input 
                style={{backgroundImage: "url('/icon_password.png')"}}
                type="password"
                name="password_confirmation"
                placeholder="confirm password"
                value={password_confirmation}
                onChange={this.handleChange}
              />
              <button disabled={this.disableButton()}>Sign Up</button>
            </form>
            <h4>Already registered? Please <Link to="/login">Log In</Link> instead!</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupPage;