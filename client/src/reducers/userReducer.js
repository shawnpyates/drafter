const initialState = {
  creating: false,
  created: false,
  authenticating: false,
  authenticated: false,
  fetching: false,
  fetched: false,
  createdUser: null,
  authenticatedUser: null,
  currentUser: null,
  errorOnCreateUser: null,
  errorOnAuthenticateUser: null,
  errorOnFetchCurrentUser: null
}

const userReducer = (state=initialState, action) => {
  switch(action.type) {
    case "CREATE_USER_PENDING": 
      return {...state, creating: true};
      break;
    case "CREATE_USER_REJECTED": 
      return {...state, creating: false, createUserError: action.payload};
      break;
    case "CREATE_USER_FULFILLED":
      return {
        ...state,
        creating: false,
        created: true,
        createdUser: action.payload
      }
    case "AUTHENTICATE_USER_PENDING": 
      return {...state, authenticating: true};
      break;
    case "AUTHENTICATE_USER_REJECTED": 
      return {...state, authenticating: false, authenticateUserError: action.payload};
      break;
    case "AUTHENTICATE_USER_FULFILLED":
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        authenticatedUser: action.payload
      }
    case "FETCH_CURRENT_USER_PENDING":
      return {...state, creating: true};
      break;
    case "FETCH_CURRENT_USER_REJECTED":
      return {...state, creating: false, fetchCurrentUserError: action.payload}
      break;
    case "FETCH_CURRENT_USER_FULFILLED":
      return {
        ...state,
        creating: false,
        created: true,
        currentUser: action.payload
      }
  }
  return state
}

export default userReducer;