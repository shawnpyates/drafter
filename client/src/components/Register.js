import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, fetchCurrentUser } from '../actions';
import { Button } from 'react-bootstrap';



@connect((store) => {
  return {
    authenticatedUser: store.user.authenticatedUser
  };
})

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      passwordFirstInsertion: "",
      passwordSecondInsertion: "",
      registeredAsPlayer: "",
      position: "",
      errorMessage: "" 
    }
  }

  handleChange = ev => {
    switch (ev.target.name) {
      case "firstName": 
        this.setState({firstName: ev.target.value})
        break
      case "lastName": 
        this.setState({lastName: ev.target.value})
        break
      case "email": 
        this.setState({email: ev.target.value})
        break
      case "passwordFirstInsertion": 
        this.setState({passwordFirstInsertion: ev.target.value})
        break
      case "passwordSecondInsertion": 
        this.setState({passwordSecondInsertion: ev.target.value})
        break
      case "registeredAsPlayer": 
        if (ev.target.value === "No") this.setState({position: ""})
        this.setState({registeredAsPlayer: ev.target.value})
        break
      case "position": 
        this.setState({position: ev.target.value})
        break
    }
  }

  validateEmail = email => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  handleSubmit = () => {
    for (let key in this.state) {
      if ((!this.state[key] && key !== "errorMessage") && 
           !(key === "position" && this.state.registeredAsPlayer === "No")) {
        this.setState({errorMessage: "Please fill in all fields."})
        return
      }
    }
    if (this.state.passwordFirstInsertion !== this.state.passwordSecondInsertion) {
      this.setState({errorMessage: "Your passwords did not match. Please try again."})
      return
    }
    if (this.state.passwordFirstInsertion.length < 8) {
      this.setState({errorMessage: "Your password must contain at least 8 characters."})
      return
    } 
    if (!this.validateEmail(this.state.email)) {
      this.setState({errorMessage: "Please enter a valid e-mail address."})
      return
    }
    const isRegistered = this.state.registeredAsPlayer === "Yes" ? true : false
    const position = this.state.position ? this.state.position : null
    const body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.passwordFirstInsertion,
      registeredAsPlayer: isRegistered,
      position: position
    }
    this.props.dispatch(createUser(body))
  }

  componentDidUpdate() {
    if (this.props.authenticatedUser) {
      this.props.dispatch(fetchCurrentUser());
    }
  }


  render() {
    let isPositionDisabled = this.state.registeredAsPlayer === "Yes" ? false : true
    let positionPlaceholder = isPositionDisabled ? "" : "Please Select" 
    return (
      <div className="registrationContainer">
        <form className="registrationForm">
          <h2>Register</h2>
          <label>
            First name: 
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
          </label>
          <label>
            Last name: 
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </label>
          <label>
            Email: 
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password: 
            <input type="password" name="passwordFirstInsertion" value={this.state.passwordFirstInsertion} onChange={this.handleChange} />
          </label>
          <label>
            Confirm password: 
            <input type="password" name="passwordSecondInsertion" value={this.state.passwordSecondInsertion} onChange={this.handleChange} />
          </label>
          <label>
            Would you like to register as a player? 
            <select name="registeredAsPlayer"
                    value={this.state.registeredAsPlayer} 
                    onChange={this.handleChange} 
                    style={{marginLeft: 10}}
            >
              <option value="" disabled>Please Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
          <label>
            If so, please choose a position: 
            <select name="position"
                    disabled={isPositionDisabled} 
                    value={this.state.position} 
                    style={{marginLeft: 10}}
                    onChange={this.handleChange}
            >
              <option value="" disabled>{positionPlaceholder}</option>
              <option>Center</option>
              <option>Right Wing / Left Wing</option>
              <option>Defence</option>
              <option>Goaltender</option>
            </select>
          </label>
        </form>
        <p style={{color: "red"}}>{this.state.errorMessage}</p>
        <Button className="submitRegistration" onClick={this.handleSubmit}>
          Register
        </Button>
      </div>
    )
  }
}

export default Register;