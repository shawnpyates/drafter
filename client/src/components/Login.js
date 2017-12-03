import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { authenticateUser, fetchCurrentUser } from '../actions';


@connect((store) => {
  return {
    authenticatedUser: store.user.authenticatedUser,
    errorOnAuthenticateUser: store.user.errorOnAuthenticateUser
  };
})

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    }
  }

  handleChange = ev => {
    switch (ev.target.name) {
      case "email": 
        this.setState({email: ev.target.value})
        break
      case "password": 
        this.setState({password: ev.target.value})
        break
    }
  }

  handleSubmit = () => {
    if (this.state.email && this.state.password) {
      this.setState({newAttempt: true})
      if (!this.validateEmail(this.state.email)) {
        this.setState({errorMessage: "Please enter a valid email address."})
        return
      }
      let body = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.dispatch(authenticateUser(body))
    }
  }

  validateEmail = email => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticatedUser) {
      this.props.dispatch(fetchCurrentUser())
      return
    }
    if (nextProps.errorOnAuthenticateUser) {
      let failure = nextProps.errorOnAuthenticateUser.response.data.failure
      switch (failure) {
        case "incorrectPassword":
          this.setState({errorMessage: "Password is incorrect."})
          break
        case "cannotFindUser":
          this.setState({errorMessage: "Could not find any user with that email."})
          break
      }
    }
  }

  render() {
    return (
      <div className="registrationContainer">
        <form className="registrationForm">
          <h2>Log In</h2>
          <label>
            Email: 
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password: 
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
        </form>
        <p style={{color: "red"}}>{this.state.errorMessage}</p>
        <Button className="submitRegistration" onClick={this.handleSubmit}>
          Log In
        </Button>
      </div>
    )
  }
}

export default Login;