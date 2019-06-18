import axios from 'axios';

export const fetchTeamsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_TEAMS_FROM_USER_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/users/${userId}/teams`)
    .then((response) => {
      const { teams } = response.data;
      dispatch({ type: 'FETCH_TEAMS_FROM_USER_FULFILLED', payload: teams });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TEAMS_FROM_USER_REJECTED', payload: err });
    });
};

export const fetchTeamsByDraft = draftId => (dispatch) => {
  dispatch({ type: 'FETCH_TEAMS_FROM_DRAFT_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/drafts/${draftId}/teams`)
    .then((response) => {
      const { teams } = response.data;
      dispatch({ type: 'FETCH_TEAMS_FROM_DRAFT_FULFILLED', payload: teams });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TEAMS_FROM_DRAFT_REJECTED', payload: err });
    });
};

export const createTeam = body => (dispatch) => {
  dispatch({ type: 'CREATE_TEAM_PENDING ' });
  const { name, ownerUserId, draftId } = body;
  return axios.post('/api/teams', { name, ownerUserId, draftId })
    .then((response) => {
      const { team } = response.data;
      dispatch({ type: 'CREATE_TEAM_FULFILLED', payload: team });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_TEAM_REJECTED', payload: err });
    });
};

export const fetchOneTeam = id => (dispatch) => {
  dispatch({ type: 'FETCH_ONE_TEAM_PENDING' });
  axios.get(`/api/teams/${id}`)
    .then((response) => {
      const { team } = response.data;
      dispatch({ type: 'FETCH_ONE_TEAM_FULFILLED', payload: team });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ONE_TEAM_REJECTED', payload: err });
    });
};
