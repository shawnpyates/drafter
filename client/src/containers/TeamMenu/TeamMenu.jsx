import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ErrorIndicator, LoadingIndicator, ProfileCard } from '../../components';

import Players from '../Players/Players';

import { team as teamProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import { fetchOneTeam } from '../../actions';

import { errors as ERROR_TEXTS } from '../../texts.json';

import { TeamMenuContainer } from './styledComponents';

const { properties: profileProperties } = teamProfileData;

const mapStateToProps = (state) => {
  const { currentTeam, fetching: isFetchingTeam } = state.team;
  const { currentUser } = state.user;
  return { currentTeam, isFetchingTeam, currentUser };
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
    const { currentTeam, isFetchingTeam, currentUser } = this.props;
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
    if (currentTeam && ![owner.uuid, draft.ownerUserId].includes(currentUser.uuid)) {
      return <ErrorIndicator message={ERROR_TEXTS.notAuthorized} />;
    }
    const profileCardData = {
      [ownerKey]: owner && `${owner.firstName} ${owner.lastName}`,
      [draftKey]: draft && draft.name,
    };
    const profileCardLinkForUpdating = `/updateTeam/${uuid}`;
    return (
      <TeamMenuContainer>
        {(currentTeam && !isFetchingTeam)
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
        )}
        {isFetchingTeam && <LoadingIndicator />}
      </TeamMenuContainer>
    );
  }
}

TeamMenu.defaultProps = {
  currentTeam: null,
};

TeamMenu.propTypes = {
  currentTeam: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchOneTeamPropFn: PropTypes.func.isRequired,
  isFetchingTeam: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);
