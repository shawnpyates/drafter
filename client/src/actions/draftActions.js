import axios from 'axios';

import { draftInfoTexts } from '../texts.json';

import { getTextWithInjections } from '../helpers';

const {
  draftClosed: DRAFT_CLOSED,
  draftTeamOnClock: DRAFT_TEAM_ON_CLOCK,
} = draftInfoTexts;

const DISPLAY_INITIAL_TEXT_DURATION = 5000;

const getTeamIsOnClockText = (draft) => {
  const { Teams: teams } = draft;
  const teamOnClock = teams.find(team => team.uuid === draft.currentlySelectingTeamId) || teams[0];
  return getTextWithInjections(DRAFT_TEAM_ON_CLOCK, { teamName: teamOnClock.name });
};

const getSecondaryMessage = (draft) => {
  switch (draft.status) {
    case 'closed':
      return DRAFT_CLOSED;
    case 'open':
      return getTeamIsOnClockText(draft);
    default:
      return null;
  }
};

export const setDraftInfoText = ({
  draft,
  message,
  shouldDraftViewBlur,
}) => (dispatch) => {
  const secondaryMessage = draft && getSecondaryMessage(draft);
  if (message) {
    dispatch({ type: 'SET_DRAFT_INFO_TEXT', payload: { message, shouldDraftViewBlur } });
    if (secondaryMessage) {
      setTimeout(() => {
        dispatch({
          type: 'SET_DRAFT_INFO_TEXT',
          payload: { message: secondaryMessage, shouldDraftViewBlur: false },
        });
      }, DISPLAY_INITIAL_TEXT_DURATION);
    }
  } else {
    dispatch({
      type: 'SET_DRAFT_INFO_TEXT',
      payload: { message: secondaryMessage, shouldDraftViewBlur: false },
    });
  }
};

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

export const fetchOneDraft = (id, message, isRefetch) => (dispatch) => {
  dispatch({ type: 'FETCH_ONE_DRAFT_PENDING', payload: isRefetch });
  axios.get(`/api/drafts/${id}`)
    .then((response) => {
      const { draft } = response.data;
      const { status } = draft;
      dispatch({ type: 'FETCH_ONE_DRAFT_FULFILLED', payload: draft });
      if (status === 'open' || status === 'closed') {
        dispatch(setDraftInfoText({
          draft,
          message,
          shouldDraftViewBlur: true,
        }));
      }
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ONE_DRAFT_REJECTED', payload: err });
    });
};

export const updateDraft = ({ id, body, socket }) => (dispatch) => {
  dispatch({ type: 'UPDATE_DRAFT_PENDING' });
  return axios.put(`/api/drafts/${id}`, body)
    .then((response) => {
      const { draft } = response.data;
      const { status } = body;
      if (socket && status === 'open') {
        if (status === 'open') {
          socket.emit('draftStarted', { draftId: draft.uuid, draftName: draft.name });
        } else if (status === 'closed') {
          socket.emit('draftEnded', { draftId: draft.uuid, draftName: draft.name });
        }
      }
      dispatch({ type: 'UPDATE_DRAFT_FULFILLED', payload: draft });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DRAFT_REJECTED', payload: err });
    });
};

export const removeCurrentDraftFromState = () => (dispatch) => {
  dispatch({ type: 'REMOVE_CURRENT_DRAFT_FROM_STATE' });
};

export const blurDraft = () => (dispatch) => {
  dispatch({ type: 'BLUR_DRAFT' });
};
