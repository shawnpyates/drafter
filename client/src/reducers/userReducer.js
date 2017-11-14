const initialState = {
  creating: false,
  created: false,
  user: null,
  error: null
}

const userReducer = (state=initialState, action) => {
  console.log("ACTION::::: ", action)
  switch(action.type) {
    case "CREATE_USER_PENDING": 
      return {...state, creating: true};
      break;
    case "CREATE_USER_REJECTED": 
      return {...state, creating: false, error: action.payload};
      break;
    case "CREATE_USER_FULLFILLED":
      return {
        ...state,
        creating: false,
        created: true,
        user: action.payload
      }
  }
  return state
}

export default userReducer;