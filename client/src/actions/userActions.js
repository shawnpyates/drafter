import axios from 'axios';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const SERVER_URL = process.env.SERVER_URL;
const { localStorage } = window;

export const fetchCurrentUser = () => {
  const token = localStorage.getItem('drafterUserToken');
  return (dispatch) => {
    dispatch({ type: 'FETCH_CURRENT_USER_PENDING' });
    jwt.verify(token, JWT_SECRET, (jwtVerifyingError, decoded) => {
      if (jwtVerifyingError) {
        dispatch({ type: 'FETCH_CURRENT_USER_REJECTED', payload: jwtVerifyingError });
      } else {
        const { userId } = decoded;
        axios.get(`${SERVER_URL}/api/users/${userId}`)
          .then((response) => {
            dispatch({ type: 'FETCH_CURRENT_USER_FULFILLED', payload: response.data });
          })
          .catch((dbFetchingError) => {
            dispatch({ type: 'FETCH_CURRENT_USER_REJECTED', payload: dbFetchingError });
          });
      }
    });
  };
};

export const authenticateUser = body => (dispatch) => {
  dispatch({ type: 'AUTHENTICATE_USER_PENDING' });
  const { email, password } = body;
  return axios.post('/api/users/auth', { email, password })
    .then((response) => {
      localStorage.setItem('drafterUserToken', response.data.token.token);
      dispatch({ type: 'AUTHENTICATE_USER_FULFILLED', payload: response.data.user });
    })
    .catch((err) => {
      dispatch({ type: 'AUTHENTICATE_USER_REJECTED', payload: err });
    });
};

export const fetchUsersByTeam = teamId => (dispatch) => {
  dispatch({ type: 'FETCH_USERS_FROM_TEAM_PENDING '});
  axios.get(`${SERVER_URL}/api/teams/${teamId}/users`)
    .then((response) => {
      const { users } = response.data;
      dispatch({ type: 'FETCH_USERS_FROM_TEAM_FULFILLED', payload: users })
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_USERS_FROM_TEAM_REJECTED', payload: err});
    });
};

export const fetchUsersByDraft = draftId => (dispatch) => {
  dispatch({ type: 'FETCH_USERS_FROM_DRAFT_PENDING '});
  axios.get(`${SERVER_URL}/api/drafts/${draftId}/users`)
    .then((response) => {
      const { users } = response.data;
      dispatch({ type: 'FETCH_USERS_FROM_DRAFT_FULFILLED', payload: users })
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_USERS_FROM_DRAFT_REJECTED', payload: err});
    });
};

export const createUser = body => (dispatch) => {
  dispatch({ type: 'CREATE_USER_PENDING' });
  const {
    firstName,
    lastName,
    email,
    password,
    registeredAsPlayer,
    position,
  } = body;
  return axios.post('/api/users', {
    firstName,
    lastName,
    email,
    password,
    registeredAsPlayer,
    position,
  })
    .then((createUserResponse) => {
      dispatch({ type: 'CREATE_USER_FULFILLED', payload: createUserResponse.data });
      authenticateUser({ email, password });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_USER_REJECTED', payload: err });
    });
};

export const updateUser = body => (dispatch) => {
  dispatch({ type: 'UPDATE_CURRENT_USER_PENDING' });
  const { id, email, registeredAsPlayer, position } = body;
  return axios.put(`/api/users/${id}`, { email, registeredAsPlayer, position })
    .then((response) => {
      dispatch({ type: 'UPDATE_CURRENT_USER_FULFILLED', payload: response.data })
     })
    .catch((err) => {
      dispatch({ type: 'UPDATE_CURRENT_USER_REJECTED', payload: err })
    });
};
