import React, { useEffect, useState } from 'react';
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
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { params: { id } = {}, url } = match; 
  const redirectUrl = url.replace('reorderTeams', 'show');
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

  const redirectToDraftHandler = (ev) => {
    ev.preventDefault();
    setShouldRedirect(true);
  };

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
        <DragAndDropTable
          title={draftName}
          teams={teams}
          onDragEnd={onDragEnd}
          areTeamsUpdating={areTeamsUpdating}
          redirectToDraftHandler={redirectToDraftHandler}
        />
      )}
      {shouldRedirect && <Redirect to={redirectUrl} />}
      {(isFetchingDraft && !areTeamsUpdating) && <LoadingIndicator />}
    </div>
  );
}

UpdateSelectionOrder.defaultProps = {
  currentDraft: null,
};

UpdateSelectionOrder.propTypes = {
  ackTeamUpdate: PropTypes.func.isRequired,
  areTeamsUpdated: PropTypes.bool.isRequired,
  areTeamsUpdating: PropTypes.bool.isRequired,
  currentDraft: PropTypes.objectOf(PropTypes.any),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchOneDraft: PropTypes.func.isRequired,
  isFetchingDraft: PropTypes.bool.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  removeCurrentDraftFromState: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSelectionOrder);
