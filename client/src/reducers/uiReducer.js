const initialState = {
  shouldUpdateDraftData: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOULD_UPDATE_DRAFT_DATA': {
      return { ...state, shouldUpdateDraftData: action.payload };
    }
    default:
      break;
  }
  return state;
};

export default uiReducer;
