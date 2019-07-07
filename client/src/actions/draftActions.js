import axios from 'axios';

export const createDraft = body => (dispatch) => {
  dispatch({ type: 'CREATE_DRAFT_PENDING ' });
  const { name, timeScheduled, ownerUserId } = body;
  return axios.post('/api/drafts', { name, timeScheduled, ownerUserId })
    .then((response) => {
      const { draft } = response.data;
      dispatch({ type: 'CREATE_DRAFT_FULFILLED', payload: draft });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_DRAFT_REJECTED', payload: err });
    });
};

export const fetchDraftsByOwner = ownerUserId => (dispatch) => {
  dispatch({ type: 'FETCH_DRAFTS_FROM_OWNER_PENDING' });
  axios.get(`/api/owners/${ownerUserId}/drafts`)
    .then((response) => {
      const { drafts } = response.data;
      dispatch({ type: 'FETCH_DRAFTS_FROM_OWNER_FULFILLED', payload: drafts });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DRAFTS_FROM_OWNER_REJECTED', payload: err });
    });
};


export const fetchDraftsByTeam = teamId => (dispatch) => {
  dispatch({ type: 'FETCH_DRAFTS_FROM_TEAM_PENDING' });
  axios.get(`/api/teams/${teamId}/drafts`)
    .then((response) => {
      const { drafts } = response.data;
      dispatch({ type: 'FETCH_DRAFTS_FROM_TEAM_FULFILLED', payload: drafts });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DRAFTS_FROM_TEAM_REJECTED', payload: err });
    });
};

// TODO - handle on backend with users namespace
export const fetchDraftsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_DRAFTS_FROM_USER_PENDING' });
  axios.get(`/api/owners/${userId}/drafts`)
    .then((response) => {
      const { drafts } = response.data;
      dispatch({ type: 'FETCH_DRAFTS_FROM_USER_FULFILLED', payload: drafts });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DRAFTS_FROM_USER_REJECTED', payload: err });
    });
};

export const fetchOneDraft = id => (dispatch) => {
  dispatch({ type: 'FETCH_ONE_DRAFT_PENDING' });
  axios.get(`/api/drafts/${id}`)
    .then((response) => {
      const { draft } = response.data;
      dispatch({ type: 'FETCH_ONE_DRAFT_FULFILLED', payload: draft });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ONE_DRAFT_REJECTED', payload: err });
    });
};
