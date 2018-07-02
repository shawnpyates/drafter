const initialState = {
  creating: false,
  created: false,
  fetched: false,
  associated: false,
  ownTeams: [],
  errorOnCreateTeam: null,
  errorOnFetchOwnTeams: null,
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
    case 'FETCH_OWN_TEAMS_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_OWN_TEAMS_REJECTED': {
      return { ...state, fetching: false, errorOnFetchOwnTeams: action.payload };
    }
    case 'FETCH_OWN_TEAMS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        ownTeams: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default teamReducer;
