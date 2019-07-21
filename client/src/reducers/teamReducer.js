const initialState = {
  creating: false,
  created: false,
  currentTeam: null,
  fetching: false,
  fetched: false,
  associated: false,
  teams: [],
  errorOnCreateTeam: null,
  errorOnFetchTeamsFromUser: null,
  errorOnFetchTeamsFromDraft: null,
  errorOnFetchOneTeam: null,
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
        createdTeam: action.payload,
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
        teams: action.payload,
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
        teams: action.payload,
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
    default:
      break;
  }
  return state;
};

export default teamReducer;
