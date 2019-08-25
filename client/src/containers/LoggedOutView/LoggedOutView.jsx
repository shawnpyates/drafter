import React, { Component } from 'react';

import { Login, Register } from '..';

import { register as registerForm, login as loginForm } from '../../../formConstants.json';

import {
  FormContainer,
  TabList,
  TabListAnchor,
  TabListItem,
  TabListContainer,
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
        <TabListContainer>
          <TabList>
            <li>
              <TabListItem isLeft>
                {this.getAnchor(registerForm.title, false)}
              </TabListItem>
            </li>
            <li>
              <TabListItem isLeft={false}>
                {this.getAnchor(loginForm.title, true)}
              </TabListItem>
            </li>
          </TabList>
        </TabListContainer>
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
