import React, { Component } from 'react';
import styled from 'styled-components';
import Login from '../Login/login.jsx';
import Register from '../Register/register.jsx';
import { register as registerForm, login as loginForm } from '../../../formConstants.json';

const FormContainer = styled.div`
  background: #11133F;
  padding: 40px;
  max-width: 600px;
  margin: 40px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
`;

const TabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const TabListAnchor = styled.a`
  text-decoration: none;
  color: #1AB188;
  transition: 0.5s ease;
  background: #FFF;
  color: #CCC;
  font-size: 20px;
  float: left;
  width: 50%;
  text-align: center;
  border: 1px solid #11133F;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: #7EC0EE;
    color: #FFF:
  }
`;

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
