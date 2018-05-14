import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard/profileCard.jsx';
import Drafts from '../Drafts/drafts.jsx';

const WelcomeMessage = styled.h2`
  margin-left: 27%;
  margin-top: 50px;
`;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  return { currentUser };
};

class MainMenu extends Component {
  constructor() {
    super();
    this.state = {
      // isLoginActiveCompsonent: true,
    };
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <WelcomeMessage>Welcome, {currentUser.firstName}!</WelcomeMessage>
        <ProfileCard user={currentUser} />
        <Drafts userId={currentUser.id} />
      </div>
    );
  }
}

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(MainMenu);
