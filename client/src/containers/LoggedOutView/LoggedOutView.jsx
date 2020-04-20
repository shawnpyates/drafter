import React, { useState } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';

import { register as registerForm, login as loginForm } from '../../formContent.json';

import {
  FormContainer,
  TabList,
  TabListItem,
  TabListContainer,
} from './styledComponents';

function LoggedOutView() {
  const [isLoginActiveComponent, toggleActiveComponent] = useState(true);

  return (
    <FormContainer>
      <TabListContainer>
        <TabList>
          <li>
            <TabListItem
              onClick={() => {
                toggleActiveComponent(false);
              }}
              isLeft
            >
              {registerForm.title}
            </TabListItem>
          </li>
          <li>
            <TabListItem
              onClick={() => {
                toggleActiveComponent(true);
              }}
            >
              {loginForm.title}
            </TabListItem>
          </li>
        </TabList>
      </TabListContainer>
      {isLoginActiveComponent && <Login />}
      {!isLoginActiveComponent && <Register />}
    </FormContainer>
  );
}

export default LoggedOutView;
