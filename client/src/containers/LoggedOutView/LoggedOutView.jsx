import React, { useState } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';

import { register as registerForm, login as loginForm } from '../../formContent.json';

import {
  FormContainer,
  TabList,
  TabListAnchor,
  TabListItem,
  TabListContainer,
} from './styledComponents';

function LoggedOutView() {
  const [isLoginActiveComponent, toggleActiveComponent] = useState(true);

  const getAnchor = (text, isLoginButton) => (
    <TabListAnchor onClick={() => toggleActiveComponent(isLoginButton)}>
      {text}
    </TabListAnchor>
  );

  return (
    <FormContainer>
      <TabListContainer>
        <TabList>
          <li>
            <TabListItem isLeft>
              {getAnchor(registerForm.title, false)}
            </TabListItem>
          </li>
          <li>
            <TabListItem isLeft={false}>
              {getAnchor(loginForm.title, true)}
            </TabListItem>
          </li>
        </TabList>
      </TabListContainer>
      {isLoginActiveComponent && <Login />}
      {!isLoginActiveComponent && <Register />}
    </FormContainer>
  );
};

export default LoggedOutView;
