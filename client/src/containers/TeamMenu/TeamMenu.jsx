import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ProfileCard } from '../../components';

import { Players } from '..';

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
    const {
      owner: ownerKey,
      draft: draftKey,
    } = profileProperties;
    const {
      uuid,
      name: profileCardTitle,
      Draft: draft,
      Players: players,
      User: owner,
    } = currentTeam || {};
    const profileCardData = {
      [ownerKey]: owner && `${owner.firstName} ${owner.lastName}`,
      [draftKey]: draft && draft.name,
    };
    const profileCardLinkForUpdating = `/updateTeam/${uuid}`;
    return (
      currentTeam 
      && (
        <div>
          <ProfileCard
            title={profileCardTitle}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
          />
          <Players
            teamId={uuid}
            parent="team"
            players={players}
          />
        </div>
      )
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
