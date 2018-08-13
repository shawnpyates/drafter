import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard/profileCard.jsx';
import {
  profileProperties,
  profileValues,
} from '../../components/ProfileCard/profileCardConstants.json';
import Drafts from '../Drafts/drafts.jsx';
import Teams from '../Teams/teams.jsx';

import { WelcomeMessage } from './styledComponents';

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const MainMenu = ({ currentUser }) => {
  const profileCardTitle = `${currentUser.firstName} ${currentUser.lastName}`;
  const { email, registeredAsPlayer, position } = profileProperties;
  const { registeredYes, registeredNo, positionNotApplicable} = profileValues;
  const profileCardData = {
    [email]: currentUser.email,
    [registeredAsPlayer]: currentUser.registeredAsPlayer ? registeredYes : registeredNo,
    [position]: currentUser.position || positionNotApplicable,
  };
  const profileCardLinkForUpdating = '/updateUser';
  return (
    <div>
      <WelcomeMessage>Welcome, {currentUser.firstName}!</WelcomeMessage>
      <ProfileCard
        title={profileCardTitle}
        data={profileCardData}
        linkForUpdating={profileCardLinkForUpdating}
      />
      <Drafts userId={currentUser.id} fetchBy='user' />
      <Teams userId={currentUser.id} fetchBy='user' />
    </div>
  );
};

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(MainMenu);
