import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainMenu } from '..';
import componentRoutes from './componentRoutes';

const checkForHashThenRender = () => {
  const { hash } = window.location;
  return (
    hash
      ? <Redirect to={hash.split('#')[1]} />
      : <MainMenu />
  );
};


const LoggedInView = () => (
  <Switch>
    <Route exact path="/" render={() => checkForHashThenRender()} />
    {componentRoutes.map(route => <Route path={route.path} component={route.component} />)}
  </Switch>
);

export default LoggedInView;
