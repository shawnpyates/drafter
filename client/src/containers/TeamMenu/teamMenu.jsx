import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard/profileCard.jsx';
import { team as teamProfileData } from '../../components/ProfileCard/profileCardConstants.json';
import { fetchUsersByTeam, fetchDraftsByTeam } from '../../actions';
import Drafts from '../Drafts/drafts.jsx';
import Players from '../Players/players.jsx';

const { properties: profileProperties, values: profileValues } = teamProfileData;

const mapStateToProps = (state) => {
  const { teams, users, drafts } = state.team;
  return { teams, users, drafts };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchUsersByTeam: body => dispatch(fetchUsersByTeam(id)),
    fetchDraftsByTeam: body => dispatch(fetchDraftsByTeam(id)),
  };
}

class TeamMenu extends Component {

  render() {
    const { teams, users, drafts, match } = this.props;
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
        <Drafts teamId={currentTeam.id} fetchBy='team' />
        <Players teamId={currentTeam.id} fetchBy='team' />
      </div>
    );
  }
};

TeamMenu.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);
