import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class LoggedInView extends Component {
  componentDidMount() {
    this.props.socket.on('broadcastDraftStart', (draftId) => {
      const { pathname } = window.location;
      if (!pathname.includes(draftId)) {
        console.log('TODO: send notification for draft starting');
      }
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => checkForHashThenRender()} />
        {componentRoutes.map(route => <Route path={route.path} component={route.component} />)}
      </Switch>
    );
  }
};

LoggedInView.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any),
}

export default LoggedInView;
