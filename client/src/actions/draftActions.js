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
  const { name, timeScheduled, creator } = body;
  return axios.post('/api/drafts', { name, timeScheduled })
    .then((createDraftResponse) => {
      dispatch({ type: 'CREATE_DRAFT_FULFILLED', payload: createDraftResponse.data });
      dispatch({ type: 'ASSOCIATE_DRAFT_WITH_USER_PENDING ' });
      axios.post(
        `/api/drafts/${createDraftResponse.data.id}/users/${creator.id}`,
        { isAdmin: true },
      ).then((associateDraftResponse) => {
        dispatch({
          type: 'ASSOCIATE_DRAFT_WITH_USER_FULFILLED',
          payload: associateDraftResponse.data,
        });
      }).catch((associateErr) => {
        dispatch({ type: 'CREATE_DRAFT_REJECTED', payload: associateErr });
      });
    })
    .catch((createDraftErr) => {
      dispatch({ type: 'CREATE_DRAFT_REJECTED', payload: createDraftErr });
    });
};

