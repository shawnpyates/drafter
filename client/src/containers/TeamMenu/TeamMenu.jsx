import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ErrorIndicator, LoadingIndicator, ProfileCard } from '../../components';

import Players from '../Players/Players';

import { team as teamProfileData } from '../../components/ProfileCard/profileCardConstants.json';

import { fetchOneTeam, removeCurrentTeamFromState } from '../../actions';

import { errors as ERROR_TEXTS } from '../../texts.json';

import { TeamMenuContainer } from './styledComponents';

const { properties: profileProperties } = teamProfileData;

const mapStateToProps = (state) => {
  const { currentTeam, fetching: isFetchingTeam } = state.team;
  const { currentUser } = state.user;
  return { currentTeam, isFetchingTeam, currentUser };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOneTeam: (id) => dispatch(fetchOneTeam(id)),
  removeCurrentTeamFromState: () => dispatch(removeCurrentTeamFromState()),
});

function TeamMenu({
  currentTeam,
  currentUser,
  fetchOneTeam: fetchOneTeamPropFn,
  isFetchingTeam,
  match,
  removeCurrentTeamFromState: removeCurrentTeamFromStatePropFn,
}) {
  const { params: { id } = {} } = match; 
  useEffect(() => {
    if (!currentTeam) {
      fetchOneTeamPropFn(id);
    }
  }, [currentTeam]);
  useEffect(() => (
    function cleanup() {
      removeCurrentTeamFromStatePropFn();
    }
  ), []);

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
  const profileCardLinkForUpdating = `/teams/${uuid}/update`;

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

TeamMenu.defaultProps = {
  currentTeam: null,
};

TeamMenu.propTypes = {
  currentTeam: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchOneTeamPropFn: PropTypes.func.isRequired,
  isFetchingTeam: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  removeCurrentTeamFromState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMenu);
