import axios from 'axios';
const SERVER_URL = process.env.SERVER_URL;

export const fetchDraftsByUser = userId => {
  return dispatch => {
    dispatch({type: "FETCH_OWN_DRAFTS_PENDING"});
    axios.get(`${SERVER_URL}/api/users/${userId}/drafts`)
      .then(response => {
        dispatch({type: "FETCH_OWN_DRAFTS_FULFILLED", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "FETCH_OWN_DRAFTS_REJECTED", payload: err})
      })
  }
}