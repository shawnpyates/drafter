const initialState = {
  creating: false,
  created: false,
  fetching: false,
  fetched: false,
  requests: [],
  errorOnCreateRequest: null,
  errorOnFetchRequestsFromDraft: null,
  errorOnFetchRequestsFromUser: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST_PENDING':
      return { ...state, creating: true };
    case 'CREATE_REQUEST_REJECTED':
      return { ...state, creating: false, errorOnCreateRequest: action.payload };
    case 'CREATE_REQUEST_FULFILLED':
      return {
        ...state,
        creating: false,
        created: true,
        createdRequest: action.payload,
      };
    case 'FETCH_REQUESTS_FROM_DRAFT_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_REQUESTS_FROM_DRAFT_REJECTED': {
      return { ...state, fetching: false, errorOnFetchRequestsFromDraft: action.payload };
    }
    case 'FETCH_REQUESTS_FROM_DRAFT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        requests: action.payload,
      };
    }
    case 'FETCH_REQUESTS_FROM_USER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_REQUESTS_FROM_USER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchRequestsFromUser: action.payload };
    }
    case 'FETCH_REQUESTS_FROM_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        requests: action.payload,
      };
    }

    default:
      break;
  }
  return state;
};

export default requestReducer;
