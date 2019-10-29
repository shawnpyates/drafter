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

const getDraftUrl = draftId => `${SERVER_URL}/drafts/${draftId}/show`;

const getNotificationText = draftName => (
  `${draftName} has been started by its owner. Click here to go there!`
);

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
    const { socket } = this.props;
    socket.on('broadcastDraftStart', ({ draftId, draftName }) => {
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
    });
  }

  handleNotificationClick = () => {
    const { notificationDraftId } = this.state;
    window.location.replace(getDraftUrl(notificationDraftId));
  }

  render() {
    const { shouldNotificationRender, notificationDraftName } = this.state;
    return (
      <div>
        {shouldNotificationRender
          && (
            <NotificationContainer onClick={this.handleNotificationClick}>
              <NotificationText>
                {getNotificationText(notificationDraftName)}
              </NotificationText>
            </NotificationContainer>
          )
        }
        <Switch>
          <Route exact path="/" render={() => checkForHashThenRender()} />
          {componentRoutes.map(route => (
            <Route path={route.path} component={route.component} key={route.path} />
          ))}
        </Switch>
      </div>
    );
  }
}

LoggedInView.defaultProps = {
  socket: null,
};

LoggedInView.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any),
};

export default LoggedInView;
