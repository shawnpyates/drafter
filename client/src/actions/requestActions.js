import axios from 'axios';

export const fetchRequestsByDraft = draftId => (dispatch) => {
  dispatch({ type: 'FETCH_REQUESTS_FROM_DRAFT_PENDING' });
  axios.get(`/api/drafts/${draftId}/requests`)
    .then((response) => {
      const { requests } = response.data;
      dispatch({ type: 'FETCH_REQUESTS_FROM_DRAFT_FULFILLED', payload: requests });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_REQUESTS_FROM_DRAFT_REJECTED', payload: err });
    });
};

export const fetchRequestsByRequester = userId => (dispatch) => {
  dispatch({ type: 'FETCH_REQUESTS_FROM_REQUESTER_PENDING' });
  axios.get(`/api/users/${userId}/outgoingRequests`)
    .then((response) => {
      const { requests } = response.data;
      dispatch({ type: 'FETCH_REQUESTS_FROM_REQUESTER_FULFILLED', payload: requests });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_REQUESTS_FROM_REQUESTER_REJECTED', payload: err });
    });
};

export const fetchRequestsByDraftOwner = userId => (dispatch) => {
  dispatch({ type: 'FETCH_REQUESTS_FROM_DRAFT_OWNER_PENDING' });
  axios.get(`/api/users/${userId}/incomingRequests`)
    .then((response) => {
      const { requests } = response.data;
      dispatch({ type: 'FETCH_REQUESTS_FROM_DRAFT_OWNER_FULFILLED', payload: requests });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_REQUESTS_FROM_DRAFT_OWNER_REJECTED', payload: err });
    });
};

export const createRequest = body => (dispatch) => {
  dispatch({ type: 'CREATE_REQUEST_PENDING ' });
  return axios.post('/api/requests', body)
    .then((response) => {
      const { request } = response.data;
      dispatch({ type: 'CREATE_REQUEST_FULFILLED', payload: request });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_REQUEST_REJECTED', payload: err });
    });
};

// TODO - target specific request type to remove from state
export const destroyRequest = (id, requestType) => (dispatch) => {
  dispatch({ type: 'DESTROY_REQUEST_PENDING ' });
  return axios.delete(`/api/requests/${id}`)
    .then((response) => {
      const { destroyedRequestId } = response.data;
      dispatch({
        type: 'DESTROY_REQUEST_FULFILLED',
        payload: {
          destroyedRequestId,
          requestType,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: 'DESTROY_REQUEST_REJECTED', payload: err });
    });
};
