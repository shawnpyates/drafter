const initialState = {
  fetching: false,
  fetched: false,
  drafts: [],
  error: null
}

const draftReducer = (state=initialState, action) => {
  switch(action.type) {
    case "FETCH_DRAFTS_PENDING": {
      return {...state, fetching: true}
      break;
    }
    case "FETCH_DRAFTS_REJECTED": {
      return {...state, fetching: false, error: action.payload};
      break;
    }
    case "FETCH_DRAFTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        drafts: action.payload
      }
      break;
    }
  }
  return state
}

export default draftReducer;