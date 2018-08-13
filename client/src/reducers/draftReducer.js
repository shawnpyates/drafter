const initialState = {
  creating: false,
  created: false,
  fetching: false,
  fetched: false,
  drafts: [],
  errorOnCreateDraft: null,
  errorOnFetchDraftsFromUser: null,
  errorOnFetchDraftsFromTeam: null,
};

const draftReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_DRAFT_PENDING':
      return { ...state, creating: true };
    case 'CREATE_DRAFT_REJECTED':
      return { ...state, creating: false, errorOnCreateDraft: action.payload };
    case 'CREATE_DRAFT_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
        createdDraft: action.payload,
      };
    case 'FETCH_DRAFTS_FROM_USER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_DRAFTS_FROM_USER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchDraftsFromUser: action.payload };
    }
    case 'FETCH_DRAFTS_FROM_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        drafts: action.payload,
      };
    }
    case 'FETCH_DRAFTS_FROM_TEAM_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_DRAFTS_FROM_TEAM_REJECTED': {
      return { ...state, fetching: false, errorOnFetchDraftsFromTeam: action.payload };
    }
    case 'FETCH_DRAFTS_FROM_TEAM_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        drafts: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default draftReducer;
