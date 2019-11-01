import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

const MainMenu = ({ currentUser }) => {
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
};

MainMenu.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(MainMenu);
