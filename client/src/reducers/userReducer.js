const initialState = {
  creating: false,
  created: false,
  authenticating: false,
  authenticated: false,
  loggingOut: false,
  loggedOut: false,
  fetching: false,
  fetched: false,
  updating: false,
  updated: false,
  currentUser: null,
  users: [],
  errorOnCreateUser: null,
  errorOnAuthenticateUser: null,
  errorOnFetchCurrentUser: null,
  errorOnFetchUsersFromTeam: null,
  errorOnFetchUsersFromDraft: null,
  errorOnLogoutUser: null,
  errorOnUpdateCurrentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_PENDING':
      return { ...state, creating: true };
    case 'CREATE_USER_REJECTED':
      return { ...state, creating: false, errorOnCreateUser: action.payload };
    case 'CREATE_USER_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
        currentUser: action.payload,
      };
    case 'AUTHENTICATE_USER_PENDING':
      return { ...state, authenticating: true };
    case 'AUTHENTICATE_USER_REJECTED':
      return { ...state, authenticating: false, errorOnAuthenticateUser: action.payload };
    case 'AUTHENTICATE_USER_FULFILLED':
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        currentUser: action.payload,
      };
    case 'LOGOUT_USER_PENDING':
      return { ...state, loggingOut: true };
    case 'LOGOUT_USER_REJECTED':
      return { ...state, loggingOut: false, errorOnLogoutUser: action.payload };
    case 'LOGOUT_USER_FULFILLED':
      return {
        ...state,
        loggingOut: false,
        loggedOut: true,
        currentUser: null,
      };
    case 'FETCH_CURRENT_USER_PENDING':
      return { ...state, fetching: true };
    case 'FETCH_CURRENT_USER_REJECTED':
      return { ...state, fetching: false, errorOnFetchCurrentUser: action.payload };
    case 'FETCH_CURRENT_USER_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentUser: action.payload,
      };
    case 'FETCH_CURRENT_USER_NO_SESSION':
      return { ...state, fetching: false, fetched: true };
    case 'FETCH_USERS_FROM_TEAM_PENDING':
      return { ...state, fetching: true };
    case 'FETCH_USERS_FROM_TEAM_REJECTED':
      return { ...state, fetching: false, errorOnFetchUsersFromTeam: action.payload };
    case 'FETCH_USERS_FROM_TEAM_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload,
      };
    case 'FETCH_USERS_FROM_DRAFT_PENDING':
      return { ...state, fetching: true };
    case 'FETCH_USERS_FROM_DRAFT_REJECTED':
      return { ...state, fetching: false, errorOnFetchUsersFromDraft: action.payload };
    case 'FETCH_USERS_FROM_DRAFT_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload,
      };
    case 'UPDATE_CURRENT_USER_PENDING':
      return { ...state, updating: true };
    case 'UPDATE_CURRENT_USER_REJECTED':
      return { ...state, updating: false, errorOnUpdateCurrentUser: action.payload };
    case 'UPDATE_CURRENT_USER_FULFILLED':
      return {
        ...state,
        updating: false,
        updated: true,
        currentUser: action.payload,
      };
    case 'REVERT_STATE_EXCEPT_USER':
      return {
        ...initialState,
        currentUser: state.currentUser,
      };
    case 'REMOVE_CURRENT_USER_FROM_STATE':
      return { ...state, currentUser: null };
    default:
      break;
  }
  return state;
};

export default userReducer;
