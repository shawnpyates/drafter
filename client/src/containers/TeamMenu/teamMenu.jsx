import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from '../../components/ProfileCard/profileCard';

import Players from '../Players/players';
import Drafts from '../Drafts/drafts';

import { team as teamProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import { fetchUsersByTeam, fetchDraftsByTeam } from '../../actions';

const { properties: profileProperties } = teamProfileData;

const mapStateToProps = (state) => {
  const { teams, users, drafts } = state.team;
  return { teams, users, drafts };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchUsersByTeam: () => dispatch(fetchUsersByTeam(id)),
    fetchDraftsByTeam: () => dispatch(fetchDraftsByTeam(id)),
  };
};

const TeamMenu = ({
  match,
  teams,
}) => {
  const currentTeam = teams.find(team => team.id === Number(match.params.id));
  const profileCardTitle = currentTeam.name;
  const { owner } = profileProperties;
  const { id, ownerName } = currentTeam;
  const profileCardData = { [owner]: ownerName };
  const profileCardLinkForUpdating = `/updateTeam/${id}`;
  return (
    <div>
      <ProfileCard
        title={profileCardTitle}
        data={profileCardData}
        linkForUpdating={profileCardLinkForUpdating}
      />
      <Drafts teamId={currentTeam.id} fetchBy="team" />
      <Players teamId={currentTeam.id} fetchBy="team" />
    </div>
  );
};

TeamMenu.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);
