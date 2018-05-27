const initialState = {
  creating: false,
  created: false,
  fetching: false,
  fetched: false,
  associating: false,
  associated: false,
  ownDrafts: [],
  errorOnCreateDraft: null,
  errorOnFetchOwnDrafts: null,
  errorOnAssociating: null,
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
    case 'ASSOCIATE_DRAFT_WITH_USER_PENDING': {
      return { ...state, associating: true };
    }
    case 'ASSOCIATE_DRAFT_WITH_USER_REJECTED': {
      return { ...state, associating: false, errorOnAssociating: action.payload };
    }
    case 'ASSOCIATE_DRAFT_WITH_USER_FULFILLED': {
      return {
        ...state,
        associating: false,
        associated: true,
        userDraft: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default draftReducer;
