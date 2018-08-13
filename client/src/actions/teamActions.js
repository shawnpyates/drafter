import axios from 'axios';

export const fetchTeamsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_TEAMS_FROM_USER_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/users/${userId}/teams`)
    .then((response) => {
      const { teams, owners } = response.data;
      const updatedTeams = teams.map((team) => {
        const owner = owners.find(o => o.id === team.ownerUserId);
        const { name } = owner;
        return { ...team, ownerName: name };
      });
      dispatch({ type: 'FETCH_TEAMS_FROM_USER_FULFILLED', payload: updatedTeams });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TEAMS_FROM_USER_REJECTED', payload: err });
    });
};

export const fetchTeamsByDraft = draftId => (dispatch) => {
  dispatch({ type: 'FETCH_TEAMS_FROM_DRAFT_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/users/${userId}/teams`)
    .then((response) => {
      const { teams, owners } = response.data;
      const updatedTeams = teams.map((team) => {
        const owner = owners.find(o => o.id === team.ownerUserId);
        const { name } = owner;
        return { ...team, ownerName: name };
      });
      dispatch({ type: 'FETCH_TEAMS_FROM_DRAFT_FULFILLED', payload: updatedTeams });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TEAMS_FROM_DRAFT_REJECTED', payload: err });
    });
};

export const createTeam = body => (dispatch) => {
  dispatch({ type: 'CREATE_DRAFT_PENDING ' });
  const { name, ownerUserId } = body;
  return axios.post('/api/teams', { name, ownerUserId })
    .then((response) => {
      dispatch({ type: 'CREATE_DRAFT_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_DRAFT_REJECTED', payload: err });
    });
};

