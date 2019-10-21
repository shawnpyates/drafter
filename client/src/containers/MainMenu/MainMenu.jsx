import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Drafts,
  Teams,
  Requests,
} from '..';

import { ProfileCard } from '../../components';

import { MainMenuContainer, WelcomeMessage } from './styledComponents';

import { user as userProfileConstants }
  from '../../components/ProfileCard/profileCardConstants.json';

const { properties: profileProperties } = userProfileConstants;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const MainMenu = ({ currentUser }) => {
  const {
    Drafts: drafts,
    Requests: outgoingRequests,
    Teams: teams,
  } = currentUser;
  const incomingRequests = (
    drafts
      .filter(draft => draft.ownerUserId === currentUser.uuid)
      .map(draft => draft.Requests)
      .reduce((flat, next) => flat.concat(next), [])
  );
  const profileCardTitle = `${currentUser.firstName} ${currentUser.lastName}`;
  const { email } = profileProperties;
  const profileCardData = {
    [email]: currentUser.email,
  };
  const profileCardLinkForUpdating = '/updateUser';
  return (
    <MainMenuContainer>
      <WelcomeMessage>Welcome, {currentUser.firstName}!</WelcomeMessage>
      <ProfileCard
        title={profileCardTitle}
        data={profileCardData}
        linkForUpdating={profileCardLinkForUpdating}
      />
      <Drafts drafts={drafts} />
      <Teams teams={teams} fetchBy="user" displayType="table" />
      <Requests requests={outgoingRequests} fetchBy="requester" />
      <Requests requests={incomingRequests} fetchBy="draftOwner" />
    </MainMenuContainer>
  );
};

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(MainMenu);
