import React, {Component} from "react";
import {Redirect} from "react-router-dom";

const AuthHOC = WrappedComponent =>
  class AuthHOC extends Component {
    // Why a callback? Why not run before invoking in App?
    isAuthorized = () => 
      this.props.logged_in

    render() {
      return this.isAuthorized() ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/login"/>
      )
    }
  }

export default AuthHOC;