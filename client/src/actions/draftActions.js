import axios from 'axios';

export const fetchDraftsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_DRAFTS_FROM_USER_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/users/${userId}/drafts`)
    .then((response) => {
      const { drafts, owners } = response.data;
      const updatedDrafts = drafts.map((draft) => {
        const owner = owners.find(o => o.id === draft.ownerUserId);
        const { name } = owner;
        return { ...draft, ownerName: name };
      });
      dispatch({ type: 'FETCH_DRAFTS_FROM_USER_FULFILLED', payload: updatedDrafts });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DRAFTS_FROM_USER_REJECTED', payload: err });
    });
};

export const fetchDraftsByTeam = teamId => (dispatch) => {
  dispatch({ type: 'FETCH_DRAFTS_FROM_TEAM_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/teams/${teamId}/drafts`)
    .then((response) => {
      const { drafts, owners } = response.data;
      const updatedDrafts = drafts.map((draft) => {
        const owner = owners.find(o => o.id === draft.ownerUserId);
        const { name } = owner;
        return { ...draft, ownerName: name };
      });
      dispatch({ type: 'FETCH_DRAFTS_FROM_TEAM_FULFILLED', payload: updatedDrafts });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DRAFTS_FROM_TEAM_REJECTED', payload: err });
    });
};

export const createDraft = body => (dispatch) => {
  dispatch({ type: 'CREATE_DRAFT_PENDING ' });
  const { name, timeScheduled, ownerUserId } = body;
  return axios.post('/api/drafts', { name, timeScheduled, ownerUserId })
    .then((response) => {
      dispatch({ type: 'CREATE_DRAFT_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_DRAFT_REJECTED', payload: err });
    });
};

