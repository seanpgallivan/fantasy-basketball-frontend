import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {api} from '../services/api'

class Login extends Component {
  state = {
    form: {
      username: "",
      password: ""
    },
    error: false
  }

  handleChange = e => {
    let form = {...this.state.form, [e.target.name]: e.target.value}
    this.setState({form: form})
  }

  handleLogin = e => {
    e.preventDefault()
    api.auth.login(this.state.form)
      .then(data => {
        if (data.error) {
          console.log(data.error)
          this.setState({error: true});
        } else {
          this.props.onLogin(data);
          this.props.history.push('/user/home');
        }
    })
  }

  render() {
    let {username, password} = this.state.form
    return (
      <div className="main">
        <div className="box-container">
          <div className="login">
            <h2>Please Log In</h2>
            <form onSubmit={this.handleLogin}>
              <input 
                style={{backgroundImage: "url('/icon_user.png')"}}
                type="text"
                name="username"
                placeholder="username"
                value={username}
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
              <button disabled={!(username && password)}>Log In</button>
            </form>
            <h4>Not a user? Please <Link to="/signup">Sign Up</Link>!</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;