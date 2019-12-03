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
  updateOrder,
  removeCurrentDraftFromState,
} from '../../actions';


const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  const {
    currentDraft,
    fetching: isFetchingDraft,
  } = state.draft;
  const { updated: areTeamsUpdated, updating: areTeamsUpdating } = state.team;
  return {
    areTeamsUpdated,
    areTeamsUpdating,
    currentUser,
    currentDraft,
    isFetchingDraft,
  };
};

const mapDispatchToProps = dispatch => ({
  ackTeamUpdate: () => dispatch(ackTeamUpdate()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchOneDraft: id => dispatch(fetchOneDraft(id)),
  updateOrder: (draftId, body) => dispatch(updateOrder(draftId, body)),
  removeCurrentDraftFromState: () => dispatch(removeCurrentDraftFromState()),
});

function UpdateSelectionOrder({
  ackTeamUpdate,
  areTeamsUpdated,
  areTeamsUpdating,
  currentDraft,
  currentUser,
  fetchCurrentUser: fetchCurrentUserPropFn,
  fetchOneDraft: fetchOneDraftPropFn,
  isFetchingDraft,
  match,
  removeCurrentDraftFromState: removeCurrentDraftFromStatePropFn,
  updateOrder: updateOrderPropFn,
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
    try {
      const {
        source: { index: sourceIndex },
        destination: { index: destinationIndex },
      } = result;
      if (sourceIndex === destinationIndex) {
        return;
      }
      updateOrderPropFn(id, { sourceIndex, destinationIndex });
    } catch (error) {
      console.log(`[onDragEnd] Unexpected error: ${error}`);
    }
  };

  return (
    <div>
      {(currentDraft && (!isFetchingDraft || areTeamsUpdating))
      && (
        <div>
          <DragAndDropTable
            title={draftName}
            teams={teams}
            onDragEnd={onDragEnd}
            areTeamsUpdating={areTeamsUpdating}
          />
        </div>
      )}
      {(isFetchingDraft && !areTeamsUpdating) && <LoadingIndicator />}
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
