import React from 'react';
import {Link} from 'react-router-dom'

const Main = (props) => {
  return (
    <div className="main">
      <div className="logo"></div>
      <div className="main-buttons">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/signup'><button>Signup</button></Link>
      </div>
    </div>
  );
}

export default Main;