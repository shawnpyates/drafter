import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import MainMenu from '../MainMenu/MainMenu';

import componentRoutes from './componentRoutes';

import { NotificationContainer, NotificationText } from './styledComponents';

import { getTextWithInjections } from '../../helpers';

import { draftNotificationText } from '../../texts.json';

const { origin: url } = window.location;

const ALERT_DISPLAY_DURATION = 10000;

const checkForHashThenRender = () => {
  const { hash } = window.location;
  return (
    hash
      ? <Redirect to={hash.split('#')[1]} />
      : <MainMenu />
  );
};

const getDraftUrl = draftId => `${url}/drafts/${draftId}/show`;


function LoggedInView({ socket }) {
  const [state, setState] = useState({
    shouldNotificationRender: false,
    notificationDraftId: null,
    notificationDraftName: null,
  });
  useEffect(() => {
    socket.on('broadcastDraftStart', ({ draftId, draftName }) => {
      const { pathname } = window.location;
      if (!pathname.includes(draftId)) {
        setState({
          shouldNotificationRender: true,
          notificationDraftId: draftId,
          notificationDraftName: draftName,
        });
        setTimeout(() => {
          setState({
            shouldNotificationRender: false,
            notificationDraftId: null,
            notificationDraftName: null,
          });
        }, ALERT_DISPLAY_DURATION);
      }
    });
  }, []);

  const handleNotificationClick = () => {
    const { notificationDraftId } = state;
    window.location.replace(getDraftUrl(notificationDraftId));
  };

  const { shouldNotificationRender, notificationDraftName } = state;

  return (
    <div>
      {shouldNotificationRender
        && (
          <NotificationContainer onClick={handleNotificationClick}>
            <NotificationText>
              {getTextWithInjections(draftNotificationText, { draftName: notificationDraftName })}
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

LoggedInView.defaultProps = {
  socket: null,
};

LoggedInView.propTypes = {
  socket: PropTypes.objectOf(PropTypes.any),
};

export default LoggedInView;
