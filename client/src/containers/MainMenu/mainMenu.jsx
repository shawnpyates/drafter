import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard/profileCard.jsx';
import Drafts from '../Drafts/drafts.jsx';
import Teams from '../Teams/teams.jsx';

import { WelcomeMessage } from './styledComponents';

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

const MainMenu = ({ currentUser }) => (
  <div>
    <WelcomeMessage>Welcome, {currentUser.firstName}!</WelcomeMessage>
    <ProfileCard user={currentUser} />
    <Drafts userId={currentUser.id} />
    <Teams userId={currentUser.id} />
  </div>
);

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(MainMenu);
