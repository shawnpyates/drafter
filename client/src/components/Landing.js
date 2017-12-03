import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from './Register.js';
import Login from './Login.js'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registerOrLogin: "login"
    }
  }

  handleChange = value => {
    this.setState({registerOrLogin: value})
  }
  
  
  render() {
    let componentToRender = this.state.registerOrLogin === "login" ?
                            <Login /> : <Register />
    return (
      <div>
        <ToggleButtonGroup defaultValue="login" 
                           name="options"
                           onChange={this.handleChange}
                           className="landingToggleBtnGroup"
        >
          <ToggleButton className="loginToggleBtn" value="login">
            Log In
          </ToggleButton>
          <ToggleButton className="registerToggleBtn" value="register">
            Register
          </ToggleButton>
        </ToggleButtonGroup>
        {componentToRender}
      </div>
    )
  }
}

export default Landing;