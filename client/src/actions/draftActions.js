import axios from 'axios';

export const fetchDraftsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_OWN_DRAFTS_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/users/${userId}/drafts`)
    .then((response) => {
      dispatch({ type: 'FETCH_OWN_DRAFTS_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_OWN_DRAFTS_REJECTED', payload: err });
    });
};

export const createDraft = body => (dispatch) => {
  dispatch({ type: 'CREATE_DRAFT_PENDING ' });
  const { name, timeScheduled, creatorId } = body;
  return axios.post('/api/drafts', { name, timeScheduled, creatorId })
    .then((response) => {
      dispatch({ type: 'CREATE_DRAFT_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_DRAFT_REJECTED', payload: err });
    });
};

