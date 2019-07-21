import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from '../../components/ProfileCard/profileCard';

import Players from '../Players/players';
import Drafts from '../Drafts/drafts';

import { team as teamProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import { fetchOneTeam } from '../../actions';

const { properties: profileProperties } = teamProfileData;

const mapStateToProps = (state) => {
  const { currentTeam } = state.team;
  return { currentTeam };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOneTeamPropFn: () => dispatch(fetchOneTeam(id)),
  };
};

class TeamMenu extends Component {
  componentDidMount() {
    const {
      fetchOneTeamPropFn,
      match: { params },
    } = this.props;
    fetchOneTeamPropFn(params.id);
  }
  render() {
    const { currentTeam } = this.props;
    const { owner } = profileProperties;
    const {
      uuid,
      ownerName,
      name: profileCardTitle,
    } = currentTeam || {};
    const profileCardData = { [owner]: ownerName };
    const profileCardLinkForUpdating = `/updateTeam/${uuid}`;
    return (
      currentTeam &&
        <div>
          <ProfileCard
            title={profileCardTitle}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
          />
          <Drafts teamId={uuid} fetchBy="team" />
          <Players teamId={uuid} fetchBy="team" />
        </div>
    );
  }
}

TeamMenu.defaultProps = {
  currentTeam: null,
};

TeamMenu.propTypes = {
  currentTeam: PropTypes.objectOf(PropTypes.any),
  fetchOneTeamPropFn: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);
