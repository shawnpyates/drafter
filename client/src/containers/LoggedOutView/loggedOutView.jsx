import React, { Component } from 'react';
import Login from '../Login/login.jsx';
import Register from '../Register/register.jsx';
import { register as registerForm, login as loginForm } from '../../../formConstants.json';

import {
  FormContainer,
  TabList,
  TabListAnchor,
} from './styledComponents';

class LoggedOutView extends Component {
  constructor() {
    super();
    this.state = {
      isLoginActiveComponent: true,
    };
  }

  getAnchor(text, isLogInButton) {
    return (
      <TabListAnchor onClick={() => this.toggleActiveComponent(isLogInButton)}>
        {text}
      </TabListAnchor>
    );
  }

  toggleActiveComponent(isLoginActiveComponent) {
    this.setState({ isLoginActiveComponent });
  }

  render() {
    return (
      <FormContainer>
        <TabList>
          <li>
            {this.getAnchor(registerForm.title, false)}
          </li>
          <li>
            {this.getAnchor(loginForm.title, true)}
          </li>
        </TabList>
        {this.state.isLoginActiveComponent &&
          <Login />
        }
        {!this.state.isLoginActiveComponent &&
          <Register />
        }
      </FormContainer>
    );
  }
}

export default LoggedOutView;
