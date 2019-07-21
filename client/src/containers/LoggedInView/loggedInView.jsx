import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';

import MainMenu from '../MainMenu/mainMenu';
import componentRoutes from './componentRoutes';

const MainContainer = styled.div`
  position: relative;
`;

const checkForHashThenRender = () => {
  const { hash } = window.location;
  return (
    hash
      ? <Redirect to={hash.split('#')[1]} />
      : <MainMenu />
  );
};

const LoggedInView = () => (
  <MainContainer>
    <Route exact path="/" render={() => checkForHashThenRender()} />
    {componentRoutes.map(route => <Route path={route.path} component={route.component} />)}
  </MainContainer>
);

export default LoggedInView;
