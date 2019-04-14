import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from '../../components/ProfileCard/profileCard';

import Drafts from '../Drafts/drafts';
import Teams from '../Teams/teams';

import { MainMenuContainer, WelcomeMessage } from './styledComponents';

import { user as userProfileConstants }
  from '../../components/ProfileCard/profileCardConstants.json';

const { properties: profileProperties } = userProfileConstants;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const MainMenu = ({ currentUser }) => {
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
      <Drafts userId={currentUser.id} fetchBy="user" />
      <Teams userId={currentUser.id} fetchBy="user" />
    </MainMenuContainer>
  );
};

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(MainMenu);
