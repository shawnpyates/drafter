import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainMenu } from '..';
import componentRoutes from './componentRoutes';

import { NotificationContainer, NotificationText } from './styledComponents';

const ALERT_DISPLAY_DURATION = 10000;

const checkForHashThenRender = () => {
  const { hash } = window.location;
  return (
    hash
      ? <Redirect to={hash.split('#')[1]} />
      : <MainMenu />
  );
};

class LoggedInView extends Component {
  constructor() {
    super();
    this.state = {
      shouldNotificationRender: false,
      notificationDraftName: null,
    };
  }
  componentDidMount() {
    this.props.socket.on('broadcastDraftStart', ({ draftId, draftName }) => {
      const { pathname } = window.location;
      if (!pathname.includes(draftId)) {
        this.setState({ shouldNotificationRender: true, notificationDraftName: draftName }, () => {
          setTimeout(() => {
            this.setState({ shouldNotificationRender: false, notificationDraftName: null });
          }, ALERT_DISPLAY_DURATION);
        });
      }
    })
  }

  render() {
    const { shouldNotificationRender, notificationDraftName } = this.state;
    return (
      <div>
        {shouldNotificationRender &&
          <NotificationContainer>
            <NotificationText>
              {notificationDraftName} has been started by its owner. Click here to go there!
            </NotificationText>
          </NotificationContainer>
        }
        <Switch>
          <Route exact path="/" render={() => checkForHashThenRender()} />
          {componentRoutes.map(route => <Route path={route.path} component={route.component} />)}
        </Switch>
      </div>
    );
  }
};

LoggedInView.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any),
}

export default LoggedInView;
