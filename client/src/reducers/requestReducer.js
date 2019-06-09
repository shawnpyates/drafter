const initialState = {
  creating: false,
  created: false,
  fetching: false,
  fetched: false,
  requestsForDraft: [],
  outgoingRequests: [],
  incomingRequests: [],
  errorOnCreateRequest: null,
  errorOnFetchRequestsFromDraft: null,
  errorOnFetchRequestsFromRequester: null,
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
        requestsFromDraft: action.payload,
      };
    }
    case 'FETCH_REQUESTS_FROM_REQUESTER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_REQUESTS_FROM_REQUESTER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchRequestsFromRequester: action.payload };
    }
    case 'FETCH_REQUESTS_FROM_REQUESTER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        outgoingRequests: action.payload,
      };
    }
    case 'FETCH_REQUESTS_FROM_DRAFT_OWNER_PENDING': {
      return { ...state, fetching: true };
    }
    case 'FETCH_REQUESTS_FROM_DRAFT_OWNER_REJECTED': {
      return { ...state, fetching: false, errorOnFetchRequestsFromDraftOwner: action.payload };
    }
    case 'FETCH_REQUESTS_FROM_DRAFT_OWNER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        incomingRequests: action.payload,
      };
    }

    default:
      break;
  }
  return state;
};

export default requestReducer;
