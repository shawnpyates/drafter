import axios from 'axios';

export const fetchTeamsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_OWN_TEAMS_PENDING' });
  axios.get(`${process.env.SERVER_URL}/api/users/${userId}/teams`)
    .then((response) => {
      const { data } = response;
      const updatedTeams = data.teams.map((team) => {
        const owner = data.owners.find(o => o.id === team.ownerUserId);
        const { name } = owner;
        return { ...team, ownerName: name };
      });
      dispatch({ type: 'FETCH_OWN_TEAMS_FULFILLED', payload: updatedTeams });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_OWN_TEAMS_REJECTED', payload: err });
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

