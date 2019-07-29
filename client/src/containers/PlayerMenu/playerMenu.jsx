import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from '../../components/ProfileCard/profileCard';

import { player as playerProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import { fetchOnePlayer } from '../../actions';

const {
  properties: profileProperties,
  values: profileValues,
} = playerProfileData;

const mapStateToProps = (state) => {
  const { currentPlayer } = state.player;
  return { currentPlayer };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOnePlayerPropFn: () => dispatch(fetchOnePlayer(id)),
  };
};

class PlayerMenu extends Component {
  componentDidMount() {
    const {
      fetchOnePlayerPropFn,
      match: { params },
    } = this.props;
    fetchOnePlayerPropFn(params.id);
  }
  render() {
    const { currentPlayer } = this.props;
    const {
      email: emailKey,
      position: positionKey,
      draft: draftKey,
      team: teamKey,
    } = profileProperties;
    const { none } = profileValues;
    const {
      uuid,
      name: profileCardTitle,
      email,
      position,
      Draft: draft,
      Team: team,
    } = currentPlayer || {};
    const profileCardData = {
      [emailKey]: email,
      [positionKey]: position,
      [draftKey]: (draft && draft.name) || none,
      [teamKey]: (team && team.name) || none,
    };
    const profileCardLinkForUpdating = `/updatePlayer/${uuid}`;
    return (
      currentPlayer &&
        <div>
          <ProfileCard
            title={profileCardTitle}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
          />
        </div>
    );
  }
}

PlayerMenu.defaultProps = {
  currentPlayer: null,
};

PlayerMenu.propTypes = {
  currentPlayer: PropTypes.objectOf(PropTypes.any),
  fetchOnePlayerPropFn: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMenu);
