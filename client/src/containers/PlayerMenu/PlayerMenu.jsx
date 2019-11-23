import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LoadingIndicator, ProfileCard } from '../../components';

import { fetchOnePlayer, removeCurrentPlayerFromState } from '../../actions';

import { PlayerMenuContainer } from './styledComponents';

import { player as playerProfileConstants }
  from '../../components/ProfileCard/profileCardConstants.json';

const { properties: profileProperties } = playerProfileConstants;


const mapStateToProps = (state) => {
  const { currentPlayer, fetching: isFetchingPlayer } = state.player;
  const { currentUser } = state.user;
  return { currentPlayer, isFetchingPlayer, currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOnePlayer: () => dispatch(fetchOnePlayer(id)),
    removeCurrentPlayerFromState: () => dispatch(removeCurrentPlayerFromState(id)),
  };
};

function PlayerMenu({
  currentPlayer,
  currentUser,
  fetchOnePlayer: fetchOnePlayerPropFn,
  isFetchingPlayer,
  removeCurrentPlayerFromState: removeCurrentPlayerFromStatePropFn,
}) {
  useEffect(() => {
    if (!currentPlayer) {
      fetchOnePlayerPropFn();
    }
  }, [currentPlayer]);
  useEffect(() => (
    function cleanup() {
      removeCurrentPlayerFromStatePropFn();
    }
  ), []);
  const {
    uuid,
    name: playerName,
    email,
    position,
    Team: team,
    Draft: draft,
    creatorUserId,
  } = currentPlayer || {};
  console.log({ currentPlayer });
  const {
    email: emailKey,
    position: positionKey,
    team: teamKey,
    draft: draftKey,
  } = profileProperties;
  const profileCardData = {
    [emailKey]: email,
    [positionKey]: position,
    [teamKey]: team ? team.name : '(undrafted)',
    [draftKey]: draft ? draft.name : '(not in any draft)',
  };
  const profileCardLinkForUpdating = `/players/${uuid}/update`;
  const shouldUpdatingLinkRender = creatorUserId === currentUser.uuid;
  return (
    <PlayerMenuContainer>
      {(currentPlayer && !isFetchingPlayer)
      && (
        <div>
          <ProfileCard
            title={playerName}
            data={profileCardData}
            linkForUpdating={profileCardLinkForUpdating}
            shouldUpdatingLinkRender={shouldUpdatingLinkRender}
          />
        </div>
      )}
      {isFetchingPlayer && <LoadingIndicator />}
    </PlayerMenuContainer>
  );
}

PlayerMenu.defaultProps = {
  currentPlayer: null,
};

PlayerMenu.propTypes = {
  currentPlayer: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchOnePlayer: PropTypes.func.isRequired,
  isFetchingPlayer: PropTypes.bool.isRequired,
  removeCurrentPlayerFromState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMenu);
