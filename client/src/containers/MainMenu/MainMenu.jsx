import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrentUser } from '../../actions';

import Drafts from '../Drafts/Drafts';
import Teams from '../Teams/Teams';
import Requests from '../Requests/Requests';

import { ProfileCard } from '../../components';

import { MainMenuContainer, WelcomeMessage } from './styledComponents';

import { user as userProfileConstants }
  from '../../components/ProfileCard/profileCardConstants.json';

import { getAllDrafts, getTextWithInjections } from '../../helpers';

import { welcomeMessage } from '../../texts.json';

const { properties: profileProperties } = userProfileConstants;

const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  const { createdTeam } = state.team;
  return { currentUser, createdTeam };
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUserPropFn: () => dispatch(fetchCurrentUser()),
});

class MainMenu extends Component {
  componentDidUpdate(prevProps) {
    const { createdTeam, fetchCurrentUserPropFn } = this.props;
    const { createdTeam: previousTeam } = prevProps;
    if (createdTeam && (!previousTeam || previousTeam.uuid !== createdTeam.uuid)) {
      fetchCurrentUserPropFn();
    }
  }

  render() {
    const { currentUser } = this.props;
    const {
      uuid,
      firstName,
      lastName,
      email,
      Drafts: drafts,
      Requests: outgoingRequests,
      Teams: teams,
    } = currentUser;
    const allDrafts = getAllDrafts(drafts, teams);
    const incomingRequests = (
      drafts
        .filter(draft => draft.ownerUserId === uuid)
        .map(draft => draft.Requests)
        .reduce((flat, next) => flat.concat(next), [])
    );
    const profileCardTitle = `${firstName} ${lastName}`;
    const { email: emailKey } = profileProperties;
    const profileCardData = {
      [emailKey]: email,
    };
    const profileCardLinkForUpdating = '/updateUser';
    const welcomeMessageWithFirstName = getTextWithInjections(welcomeMessage, { firstName });
    return (
      <MainMenuContainer>
        <WelcomeMessage>{welcomeMessageWithFirstName}</WelcomeMessage>
        <ProfileCard
          title={profileCardTitle}
          data={profileCardData}
          linkForUpdating={profileCardLinkForUpdating}
        />
        <Drafts drafts={allDrafts} />
        <Teams teams={teams} parent="user" displayType="table" />
        <Requests requests={outgoingRequests} fetchBy="requester" />
        <Requests requests={incomingRequests} fetchBy="draftOwner" />
      </MainMenuContainer>
    );
  }
}

MainMenu.defaultProps = {
  createdTeam: null,
};

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  createdTeam: PropTypes.objectOf(PropTypes.any),
  fetchCurrentUserPropFn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
