const toggleShouldUpdateDraftData = shouldUpdate => dispatch => (
  dispatch({ type: 'TOGGLE_SHOULD_UPDATE_DRAFT_DATA', payload: shouldUpdate })
);

module.exports = { toggleShouldUpdateDraftData };
