const initialState = {
  creating: false,
  created: false,
  currentTeam: null,
  fetching: false,
  fetched: false,
  updating: false,
  updated: false,
  teamsFromDraft: null,
  teamsFromUser: null,
  errorOnCreateTeam: null,
  errorOnFetchTeamsFromUser: null,
  errorOnFetchTeamsFromDraft: null,
  errorOnFetchOneTeam: null,
  errorOnUpdateTeam: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TEAM_PENDING':
      return { ...state, creating: true };
    case 'CREATE_TEAM_REJECTED':
      return { ...state, creating: false, errorOnCreateTeam: action.payload };
    case 'CREATE_TEAM_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
      };
    case 'FETCH_TEAMS_FROM_USER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_TEAMS_FROM_USER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchTeamsFromUser: action.payload };
    }
    case 'FETCH_TEAMS_FROM_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        teamsFromDraft: null,
        teamsFromUser: action.payload,
      };
    }
    case 'FETCH_TEAMS_FROM_DRAFT_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_TEAMS_FROM_DRAFT_REJECTED': {
      return { ...state, fetching: false, errorOnFetchTeamsFromDraft: action.payload };
    }
    case 'FETCH_TEAMS_FROM_DRAFT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        teamsFromDraft: action.payload,
        teamsFromUser: null,
      };
    }

    case 'FETCH_ONE_TEAM_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_ONE_TEAM_REJECTED': {
      return { ...state, fetching: false, errorOnFetchOneTeam: action.payload };
    }
    case 'FETCH_ONE_TEAM_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentTeam: action.payload,
      };
    }
    case 'UPDATE_SELECTION_ORDER_PENDING': {
      return {
        ...state,
        updating: true,
      };
    }
    case 'UPDATE_SELECTION_ORDER_REJECTED': {
      return {
        ...state,
        updating: false,
        errorOnUpdateTeam: action.payload,
      };
    }
    case 'UPDATE_SELECTION_ORDER_FULFILLED': {
      return {
        ...state,
        updating: false,
        updated: true,
      };
    }
    case 'UPDATE_TEAM_PENDING': {
      return {
        ...state,
        updating: true,
      };
    }
    case 'UPDATE_TEAM_REJECTED': {
      return {
        ...state,
        updating: false,
        errorOnUpdateTeam: action.payload,
      };
    }
    case 'UPDATE_TEAM_FULFILLED': {
      return {
        ...state,
        updating: false,
        updated: true,
      };
    }
    case 'RESET_TEAM_STATE': {
      return { ...initialState };
    }
    default:
      break;
  }
  return state;
};

export default teamReducer;
