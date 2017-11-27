import axios from 'axios'

export const fetchDrafts = () => {
  return dispatch => {
    dispatch({type: "FETCH_DRAFTS_PENDING"});
    axios.get("http://localhost:3001/api/drafts")
      .then(response => {
        dispatch({type: "FETCH_DRAFTS_FULFILLED", payload: response.data})
      })
      .catch(err => {
        dispatch({type: "FETCH_DRAFTS_REJECTED", payload: err})
      })
  }
}