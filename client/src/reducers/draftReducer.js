const initialState = {
  fetching: false,
  fetched: false,
  ownDrafts: [],
  errorOnFetchOwnDrafts: null,
};

const draftReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_OWN_DRAFTS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_OWN_DRAFTS_REJECTED': {
      return { ...state, fetching: false, errorOnFetchOwnDrafts: action.payload };
    }
    case 'FETCH_OWN_DRAFTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        ownDrafts: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default draftReducer;
