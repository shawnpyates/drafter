import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainMenu } from '..';
import componentRoutes from './componentRoutes';

import { NotificationContainer, NotificationText } from './styledComponents';

const { SERVER_URL } = process.env;

const ALERT_DISPLAY_DURATION = 10000;

const checkForHashThenRender = () => {
  const { hash } = window.location;
  return (
    hash
      ? <Redirect to={hash.split('#')[1]} />
      : <MainMenu />
  );
};

const getDraftUrl = (draftId) => `${SERVER_URL}/drafts/${draftId}/show`;

class LoggedInView extends Component {
  constructor() {
    super();
    this.state = {
      shouldNotificationRender: false,
      notificationDraftId: null,
      notificationDraftName: null,
    };
  }
  componentDidMount() {
    this.props.socket.on('broadcastDraftStart', ({ draftId, draftName }) => {
      const { pathname } = window.location;
      if (!pathname.includes(draftId)) {
        this.setState({
          shouldNotificationRender: true,
          notificationDraftId: draftId,
          notificationDraftName: draftName,
         }, () => {
          setTimeout(() => {
            this.setState({
              shouldNotificationRender: false,
              notificationDraftId: null,
              notificationDraftName: null,
            });
          }, ALERT_DISPLAY_DURATION);
        });
      }
    })
  }

  handleNotificationClick = () => {
    window.location.replace(getDraftUrl(this.state.notificationDraftId));
  }

  render() {
    const { shouldNotificationRender, notificationDraftName } = this.state;
    return (
      <div>
        {shouldNotificationRender &&
          <NotificationContainer onClick={this.handleNotificationClick}>
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
