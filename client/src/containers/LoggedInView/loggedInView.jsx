import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';

import MainMenu from '../MainMenu/mainMenu';
import CreateDraft from '../CreateDraft/createDraft';
import CreateTeam from '../CreateTeam/createTeam';
import CreatePlayer from '../CreatePlayer/createPlayer';
import UpdateUser from '../UpdateUser/updateUser';
import DraftMenu from '../DraftMenu/draftMenu';
import TeamMenu from '../TeamMenu/teamMenu';

const MainContainer = styled.div`
  position: relative;
`;

const componentRoutes = [
  {
    path: '/createDrafts',
    component: CreateDraft,
  },
  {
    path: '/createTeams',
    component: CreateTeam,
  },
  {
    path: '/drafts/:id/createTeams',
    component: CreateTeam,
  },
  {
    path: '/updateUser',
    component: UpdateUser,
  },
  {
    path: '/drafts/:id/show',
    component: DraftMenu,
  },
  {
    path: '/teams/:id/show',
    component: TeamMenu,
  },
  {
    path: '/teams/:id/createPlayers',
    component: CreatePlayer,
  },
  {
    path: '/drafts/:id/createPlayers',
    component: CreatePlayer,
  },
];

const renderBasedOnUrl = () => {
  const { hash } = window.location;
  return (
    hash
      ? <Redirect to={hash.split('#')[1]} />
      : <MainMenu />
  );
};

const LoggedInView = () => (
  <MainContainer>
    <Route exact path="/" render={() => renderBasedOnUrl()} />
    {componentRoutes.map(route => <Route path={route.path} component={route.component} />)}
  </MainContainer>
);

export default LoggedInView;
