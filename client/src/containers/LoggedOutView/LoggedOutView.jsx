import React, { useState, Fragment } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Welcome from '../../components/Welcome/Welcome';

import { register as registerForm, login as loginForm } from '../../formContent.json';

import {
  ButtonContainer,
  FormContainer,
  TabList,
  TabListItem,
  TabListContainer,
} from './styledComponents';

function LoggedOutView() {
  const [isLoginActiveComponent, toggleActiveComponent] = useState(true);

  return (
    <Fragment>
      <Welcome />
      <FormContainer>
        <TabListContainer>
          <TabList>
            <li>
              <ButtonContainer>
                <TabListItem
                  onClick={() => {
                    toggleActiveComponent(false);
                  }}
                  isLeft
                >
                  {registerForm.title}
                </TabListItem>
              </ButtonContainer>
            </li>
            <li>
              <ButtonContainer>
                <TabListItem
                  onClick={() => {
                    toggleActiveComponent(true);
                  }}
                >
                  {loginForm.title}
                </TabListItem>
              </ButtonContainer>
            </li>
          </TabList>
        </TabListContainer>
        {isLoginActiveComponent && <Login />}
        {!isLoginActiveComponent && <Register />}
      </FormContainer>
    </Fragment>
  );
}

export default LoggedOutView;
