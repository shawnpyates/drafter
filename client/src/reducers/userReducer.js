const initialState = {
  creating: false,
  created: false,
  authenticating: false,
  authenticated: false,
  fetching: false,
  fetched: false,
  updating: false,
  updated: false,
  currentUser: null,
  errorOnCreateUser: null,
  errorOnAuthenticateUser: null,
  errorOnFetchCurrentUser: null,
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
    case 'FETCH_CURRENT_USER_PENDING':
      return { ...state, creating: true };
    case 'FETCH_CURRENT_USER_REJECTED':
      return { ...state, creating: false, errorOnFetchCurrentUser: action.payload };
    case 'FETCH_CURRENT_USER_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
        currentUser: action.payload,
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
    default:
      break;
  }
  return state;
};

export default userReducer;
