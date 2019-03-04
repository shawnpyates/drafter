import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import MainMenu from '../MainMenu/mainMenu';
import CreateDraft from '../CreateDraft/createDraft';
import CreateTeam from '../CreateTeam/createTeam';
import UpdateUser from '../UpdateUser/updateUser';
import DraftMenu from '../DraftMenu/draftMenu';
import TeamMenu from '../TeamMenu/teamMenu';

const MainContainer = styled.div`
  position: relative;
`;

const LoggedInView = () => (
  <MainContainer>
    <Route exact path="/" component={MainMenu} />
    <Route path="/createDrafts" component={CreateDraft} />
    <Route path="/createTeams" component={CreateTeam} />
    <Route path="/updateUser" component={UpdateUser} />
    <Route path="/drafts/:id" component={DraftMenu} />
    <Route path="/teams/:id" component={TeamMenu} />
  </MainContainer>
);

export default LoggedInView;
