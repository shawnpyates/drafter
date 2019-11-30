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
  fetchCurrentUser,
  fetchOneDraft,
  updateDraft,
  removeCurrentDraftFromState,
} from '../../actions';


const mapStateToProps = (state) => {
  const { currentUser } = state.user;
  const {
    currentDraft,
    fetching: isFetchingDraft,
  } = state.draft;
  return {
    currentUser,
    currentDraft,
    isFetchingDraft,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchOneDraft: id => dispatch(fetchOneDraft(id)),
  updateDraft: (id, body) => dispatch(updateDraft({ id, body })),
  removeCurrentDraftFromState: () => dispatch(removeCurrentDraftFromState()),
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function UpdateSelectionOrder({
  currentDraft,
  currentUser,
  fetchCurrentUser: fetchCurrentUserPropFn,
  fetchOneDraft: fetchOneDraftPropFn,
  isFetchingDraft,
  match,
  removeCurrentDraftFromState: removeCurrentDraftFromStatePropFn,
  updateDraft: updateDraftPropFn,
}) {
  // const [teamsOrder, setTeamsOrder] = useState(null);
  const { params: { id } = {} } = match; 
  useEffect(() => {
    if (!currentDraft) {
      fetchOneDraftPropFn(id);
    } 
  }, [currentDraft]);
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

  const onDragEnd = (teams) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      teams,
      result.source.index,
      result.destination.index,
    );
    updateDraftPropFn(id, items);
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
