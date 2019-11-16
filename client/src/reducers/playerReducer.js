const initialState = {
  creating: false,
  created: false,
  fetching: false,
  fetched: false,
  players: [],
  currentPlayer: null,
  errorOnCreatePlayer: null,
  errorOnFetchPlayersFromDraft: null,
  errorOnFetchPlayersFromTeam: null,
  errorOnUpdatePlayer: null,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PLAYER_PENDING':
      return { ...state, creating: true };
    case 'CREATE_PLAYER_REJECTED':
      return { ...state, creating: false, errorOnCreatePlayer: action.payload };
    case 'CREATE_PLAYER_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
      };
    case 'CREATE_MANY_PLAYERS_PENDING':
      return { ...state, creating: true };
    case 'CREATE_MANY_PLAYERS_REJECTED':
      return { ...state, creating: false, errorOnCreatePlayer: action.payload };
    case 'CREATE_MANY_PLAYERS_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
      };
    case 'FETCH_PLAYERS_FROM_DRAFT_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_PLAYERS_FROM_DRAFT_REJECTED': {
      return { ...state, fetching: false, errorOnFetchPlayersFromDraft: action.payload };
    }
    case 'FETCH_PLAYERS_FROM_DRAFT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        players: action.payload,
      };
    }
    case 'FETCH_PLAYERS_FROM_TEAM_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_PLAYERS_FROM_TEAM_REJECTED': {
      return { ...state, fetching: false, errorOnFetchPlayersFromTeam: action.payload };
    }
    case 'FETCH_PLAYERS_FROM_TEAM_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        players: action.payload,
      };
    }
    case 'UPDATE_PLAYER_PENDING': {
      return { ...state, updating: true };
    }
    case 'UPDATE_PLAYER_REJECTED': {
      return { ...state, updating: false, errorOnUpdatePlayer: action.payload };
    }
    case 'UPDATE_PLAYER_FULFILLED': {
      return {
        ...state,
        updating: false,
        updated: true,
        player: action.payload,
      };
    }
    case 'FETCH_ONE_PLAYER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_ONE_PLAYER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchCurrentPlayer: action.payload };
    }
    case 'FETCH_ONE_PLAYER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentPlayer: action.payload,
      };
    }
    case 'REMOVE_CURRENT_PLAYER_FROM_STATE': {
      return {
        ...state,
        currentPlayer: null,
      };
    }

    default:
      break;
  }
  return state;
};

export default playerReducer;
