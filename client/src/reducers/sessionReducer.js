const initialState = {
  creating: false,
  created: false,
  user: null,
  error: null
}

const sessionReducer = (state=initialState, action) => {
  switch(action.type) {
    case "CREATE_SESSION_PENDING": 
      return {...state, creating: true};
      break;
    case "CREATE_SESSION_REJECTED": 
      return {...state, creating: false, error: action.payload};
      break;
    case "CREATE_SESSION_FULFILLED":
      return {
        ...state,
        creating: false,
        created: true,
        session: action.payload
      }
  }
  return state
}

export default sessionReducer;