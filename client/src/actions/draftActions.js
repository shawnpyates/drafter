import axios from 'axios'

export const fetchDraftsByUser = userId => {
  return dispatch => {
    dispatch({type: "FETCH_OWN_DRAFTS_PENDING"});
    axios.get(`http://localhost:3001/api/users/${userId}/drafts`)
      .then(response => {
        dispatch({type: "FETCH_OWN_DRAFTS_FULFILLED", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "FETCH_OWN_DRAFTS_REJECTED", payload: err})
      })
  }
}