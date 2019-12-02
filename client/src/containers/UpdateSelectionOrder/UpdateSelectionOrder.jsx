import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { errors as ERROR_TEXTS } from '../../texts.json';

import {
  DragAndDropTable,
  ErrorIndicator,
  LoadingIndicator
} from '../../components';

import {
  ackTeamUpdate,
  fetchCurrentUser,
  fetchOneDraft,
  updateSelectionOrder,
  removeCurrentDraftFromState,
} from '../../actions';


const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  const {
    currentDraft,
    fetching: isFetchingDraft,
  } = state.draft;
  const { updated: areTeamsUpdated } = state.team;
  return {
    areTeamsUpdated,
    currentUser,
    currentDraft,
    isFetchingDraft,
  };
};

const mapDispatchToProps = dispatch => ({
  ackTeamUpdate: () => dispatch(ackTeamUpdate()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchOneDraft: id => dispatch(fetchOneDraft(id)),
  updateSelectionOrder: (draftId, body) => dispatch(updateSelectionOrder(draftId, body)),
  removeCurrentDraftFromState: () => dispatch(removeCurrentDraftFromState()),
});

function UpdateSelectionOrder({
  ackTeamUpdate,
  areTeamsUpdated,
  currentDraft,
  currentUser,
  fetchCurrentUser: fetchCurrentUserPropFn,
  fetchOneDraft: fetchOneDraftPropFn,
  isFetchingDraft,
  match,
  removeCurrentDraftFromState: removeCurrentDraftFromStatePropFn,
  updateSelectionOrder: updateSelectionOrderPropFn,
}) {
  const { params: { id } = {} } = match; 
  useEffect(() => {
    if (!currentDraft || areTeamsUpdated) {
      ackTeamUpdate();
      fetchOneDraftPropFn(id);
    } 
  }, [currentDraft, areTeamsUpdated]);
  useEffect(() => (
    function cleanup() {
      removeCurrentDraftFromStatePropFn();
      fetchCurrentUserPropFn();
    }
  ), []);
  
  const {
    name: draftName,
    Teams: teams,
    ownerUserId
  } = currentDraft || {};

  if (ownerUserId && ownerUserId !== currentUser.uuid) {
    return <ErrorIndicator message={ERROR_TEXTS.notAuthorized} />;
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const {
      source: { index: sourceIndex },
      destination: { index: destinationIndex },
    } = result;
    updateSelectionOrderPropFn(id, { sourceIndex, destinationIndex });
  };

  return (
    <div>
      {(currentDraft && !isFetchingDraft)
      && (
        <div>
          <DragAndDropTable
            title={draftName}
            teams={teams}
            onDragEnd={onDragEnd}
          />
        </div>
      )}
      {isFetchingDraft && <LoadingIndicator />}
    </div>
  );
}

UpdateSelectionOrder.defaultProps = {
  currentDraft: null,
};

UpdateSelectionOrder.propTypes = {
  currentPlayer: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchOnePlayer: PropTypes.func.isRequired,
  isFetchingPlayer: PropTypes.bool.isRequired,
  removeCurrentPlayerFromState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSelectionOrder);
