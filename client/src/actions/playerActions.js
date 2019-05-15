import axios from 'axios';

export const fetchPlayersByDraft = draftId => (dispatch) => {
  dispatch({ type: 'FETCH_PLAYERS_FROM_DRAFT_PENDING' });
  axios.get(`/api/drafts/${draftId}/players`)
    .then((response) => {
      const { players } = response.data;
      dispatch({ type: 'FETCH_PLAYERS_FROM_DRAFT_FULFILLED', payload: players });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_PLAYERS_FROM_DRAFT_REJECTED', payload: err });
    });
};

export const fetchPlayersByTeam = teamId => (dispatch) => {
  dispatch({ type: 'FETCH_PLAYERS_FROM_TEAM_PENDING' });
  axios.get(`/api/teams/${teamId}/players`)
    .then((response) => {
      const { players } = response.data;
      dispatch({ type: 'FETCH_PLAYERS_FROM_TEAM_FULFILLED', payload: players });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_PLAYERS_FROM_TEAM_REJECTED', payload: err });
    });
};


export const createPlayer = body => (dispatch) => {
  dispatch({ type: 'CREATE_PLAYER_PENDING ' });
  return axios.post('/api/players', body)
    .then((response) => {
      const { player } = response.data;
      dispatch({ type: 'CREATE_PLAYER_FULFILLED', payload: player });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_PLAYER_REJECTED', payload: err });
    });
};
