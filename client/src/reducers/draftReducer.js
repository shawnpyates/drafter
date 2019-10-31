const initialState = {
  creating: false,
  created: false,
  currentDraft: null,
  fetching: false,
  fetched: false,
  isRefetch: false,
  updating: false,
  updated: false,
  drafts: null,
  errorOnCreateDraft: null,
  errorOnFetchDraftsFromUser: null,
  errorOnFetchDraftsFromTeam: null,
  errorOnFetchDraftsFromOwner: null,
  errorOnFetchOneDraft: null,
  errorOnUpdateDraft: null,
  draftInfoText: null,
  shouldDraftViewBlur: false,
};

const draftReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_DRAFT_PENDING': {
      return { ...state, creating: true };
    }
    case 'CREATE_DRAFT_REJECTED': {
      return { ...state, creating: false, errorOnCreateDraft: action.payload };
    }
    case 'CREATE_DRAFT_FULFILLED': {
      return {
        ...state,
        creating: false,
        created: true,
        createdDraft: action.payload,
      };
    }
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
    case 'FETCH_DRAFTS_FROM_OWNER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_DRAFTS_FROM_OWNER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchDraftsFromOwner: action.payload };
    }
    case 'FETCH_DRAFTS_FROM_OWNER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        drafts: action.payload,
      };
    }

    case 'FETCH_ONE_DRAFT_PENDING': {
      return { ...state, fetching: true, isRefetch: action.payload };
    }
    case 'FETCH_ONE_DRAFT_REJECTED': {
      return {
        ...state,
        fetching: false,
        errorOnFetchOneDraft: action.payload,
        isRefetch: false,
      };
    }
    case 'FETCH_ONE_DRAFT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentDraft: action.payload,
        isRefetch: false,
      };
    }
    case 'UPDATE_DRAFT_PENDING': {
      return { ...state, updating: true };
    }
    case 'UPDATE_DRAFT_REJECTED': {
      return { ...state, updating: false, errorOnUpdateDraft: action.payload };
    }
    case 'UPDATE_DRAFT_FULFILLED': {
      return {
        ...state,
        updating: false,
        updated: true,
        currentDraft: action.payload,
      };
    }
    case 'SET_DRAFT_INFO_TEXT': {
      return {
        ...state,
        draftInfoText: action.payload.message,
        shouldDraftViewBlur: action.payload.shouldDraftViewBlur,
      };
    }
    case 'REMOVE_CURRENT_DRAFT_FROM_STATE':
      return {
        ...state,
        currentDraft: null,
        draftInfoText: null,
      };

    default:
      break;
  }
  return state;
};

export default draftReducer;
