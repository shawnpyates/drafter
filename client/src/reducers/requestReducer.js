const initialState = {
  creating: false,
  created: false,
  destroying: false,
  destroyed: false,
  fetching: false,
  fetched: false,
  requestsForDraft: [],
  outgoingRequests: [],
  incomingRequests: [],
  errorOnCreateRequest: null,
  errorOnDestroyingRequest: null,
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
        requestsForDraft: action.payload,
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
    case 'DESTROY_REQUEST_PENDING': {
      return { ...state, destroying: true };
    }
    case 'DESTROY_REQUEST_REJECTED':
      return { ...state, destroying: false, errorOnDestroyingRequest: action.payload };
    case 'DESTROY_REQUEST_FULFILLED': {
      const { destroyedRequestId, requestType } = action.payload;
      const requestsAfterRemoval = state[requestType].filter(request => (
        request.uuid !== destroyedRequestId
      ));
      return {
        ...state,
        [requestType]: requestsAfterRemoval,
        destroying: false,
        destroyed: true,
      };
    }

    default:
      break;
  }
  return state;
};

export default requestReducer;
