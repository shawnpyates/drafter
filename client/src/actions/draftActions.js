import axios from 'axios';

const DISPLAY_INITIAL_TEXT_DURATION = 5000;

export const createDraft = body => (dispatch) => {
  dispatch({ type: 'CREATE_DRAFT_PENDING ' });
  return axios.post('/api/drafts', body)
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

export const fetchDraftsByUser = userId => (dispatch) => {
  dispatch({ type: 'FETCH_DRAFTS_FROM_USER_PENDING' });
  axios.get(`/api/users/${userId}/drafts`)
    .then((response) => {
      const { drafts } = response.data;
      dispatch({ type: 'FETCH_DRAFTS_FROM_USER_FULFILLED', payload: drafts });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DRAFTS_FROM_USER_REJECTED', payload: err });
    });
};

export const fetchOneDraft = (id, message) => (dispatch) => {
  dispatch({ type: 'FETCH_ONE_DRAFT_PENDING' });
  axios.get(`/api/drafts/${id}`)
    .then((response) => {
      const { draft } = response.data;
      dispatch({ type: 'FETCH_ONE_DRAFT_FULFILLED', payload: draft });
      if (draft.status === 'open') {
        setDraftInfoText({
          dispatch,
          body: null,
          draft,
          message,
        });
      }
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ONE_DRAFT_REJECTED', payload: err });
    });
};

export const updateDraft = ({ id, body, socket }) => (dispatch) => {
  dispatch({ type: 'UPDATE_DRAFT_PENDING ' });
  return axios.put(`/api/drafts/${id}`, body)
    .then((response) => {
      const { draft } = response.data;
      if (socket && body.status === 'open') {
        socket.emit('draftStarted', { draftId: draft.uuid, draftName: draft.name });
      }
      dispatch({ type: 'UPDATE_DRAFT_FULFILLED', payload: draft });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DRAFT_REJECTED', payload: err });
    });
};

const setDraftInfoText = ({
  dispatch,
  draft,
  message,
}) => {
  if (message) {
    dispatch({ type: 'SET_DRAFT_INFO_TEXT', payload: { message, shouldDraftViewBlur: true } });
    setTimeout(() => {
      dispatch({
        type: 'SET_DRAFT_INFO_TEXT', 
        payload: { message: getTeamIsOnClockText(draft), shouldDraftViewBlur: false },
      });
    }, DISPLAY_INITIAL_TEXT_DURATION);
  } else {
    dispatch({
      type: 'SET_DRAFT_INFO_TEXT', 
      payload: { message: getTeamIsOnClockText(draft), shouldDraftViewBlur: false },
    });
  }
};
  
const getTeamIsOnClockText = (draft) => {
  const { Teams: teams } = draft;
  const teamOnClock = teams.find(team => team.uuid === draft.currentlySelectingTeamId) || teams[0];
  return `Now on the clock: ${teamOnClock.name}`;
};
