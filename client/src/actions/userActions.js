import axios from 'axios';
import ioClient from 'socket.io-client';

import { getAllDrafts } from '../helpers';

const createSocketConnection = (dispatch, user) => {
  const { Drafts: drafts, Teams: teams } = user;
  const allDrafts = getAllDrafts(drafts, teams);
  const socket = ioClient('https://draftmachine.herokuapp.com/drafts');
  allDrafts.forEach((draft) => {
    socket.emit('joinDraft', draft.uuid);
  });
  dispatch({ type: 'WRITE_SOCKET_CONNECTION_TO_STATE', payload: socket });
};

export const fetchCurrentUser = () => (dispatch) => {
  dispatch({ type: 'FETCH_CURRENT_USER_PENDING' });

  console.log('NODE_ENV: ', process.env.NODE_ENV);

  axios.get('/api/users/current', { withCredentials: true })
    .then((response) => {
      const { user } = response.data;
      if (!user) {
        dispatch({ type: 'FETCH_CURRENT_USER_NO_SESSION' });
        return;
      }
      createSocketConnection(dispatch, user);
      dispatch({ type: 'FETCH_CURRENT_USER_FULFILLED', payload: user });
    })
    .catch((dbFetchingError) => {
      dispatch({ type: 'FETCH_CURRENT_USER_REJECTED', payload: dbFetchingError });
    });
};

export const authenticateUser = body => (dispatch) => {
  dispatch({ type: 'AUTHENTICATE_USER_PENDING' });
  const { email, password } = body;
  return axios.post('/api/users/auth', { email, password })
    .then((response) => {
      const { user } = response.data;
      createSocketConnection(dispatch, user);
      dispatch({ type: 'AUTHENTICATE_USER_FULFILLED', payload: user });
    })
    .catch((err) => {
      dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: err });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'LOGOUT_USER_PENDING' });
  return axios.post('/api/users/logout')
    .then(() => {
      dispatch({ type: 'LOGOUT_USER_FULFILLED' });
    })
    .catch(() => {
      dispatch({ type: 'LOGOUT_USER_REJECTED' });
    });
};

export const fetchUsersByTeam = teamId => (dispatch) => {
  dispatch({ type: 'FETCH_USERS_FROM_TEAM_PENDING ' });
  axios.get(`/api/teams/${teamId}/users`)
    .then((response) => {
      const { users } = response.data;
      dispatch({ type: 'FETCH_USERS_FROM_TEAM_FULFILLED', payload: users });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_USERS_FROM_TEAM_REJECTED', payload: err });
    });
};

export const fetchUsersByDraft = draftId => (dispatch) => {
  dispatch({ type: 'FETCH_USERS_FROM_DRAFT_PENDING' });
  axios.get(`/api/drafts/${draftId}/users`)
    .then((response) => {
      const { users } = response.data;
      dispatch({ type: 'FETCH_USERS_FROM_DRAFT_FULFILLED', payload: users });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_USERS_FROM_DRAFT_REJECTED', payload: err });
    });
};

export const createUser = body => (dispatch) => {
  dispatch({ type: 'CREATE_USER_PENDING' });
  const {
    firstName,
    lastName,
    email,
    password,
  } = body;
  return axios.post('/api/users', {
    firstName,
    lastName,
    email,
    password,
  })
    .then((response) => {
      const { user } = response.data;
      createSocketConnection(dispatch, user);
      dispatch({ type: 'CREATE_USER_FULFILLED', payload: user });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_USER_REJECTED', payload: err });
    });
};

export const updateUser = (id, body) => (dispatch) => {
  dispatch({ type: 'UPDATE_CURRENT_USER_PENDING' });
  return axios.put(`/api/users/${id}`, body)
    .then((response) => {
      const { user } = response.data;
      dispatch({ type: 'UPDATE_CURRENT_USER_FULFILLED', payload: user });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_CURRENT_USER_REJECTED', payload: err });
    });
};

export const revertStateExceptUser = () => (dispatch) => {
  dispatch({ type: 'REVERT_STATE_EXCEPT_USER' });
};

export const removeCurrentUserFromState = () => (dispatch) => {
  dispatch({ type: 'REMOVE_CURRENT_USER_FROM_STATE' });
};
