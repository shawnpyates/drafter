import axios from 'axios'
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET;
const SERVER_URL = process.env.SERVER_URL;


export const fetchCurrentUser = () => {
  const token = localStorage.getItem("drafterUserToken")
  return dispatch => {
    dispatch({type: "FETCH_CURRENT_USER_PENDING"})
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        dispatch({type: "FETCH_CURRENT_USER_REJECTED", payload: err})
      } else {
        const id = decoded.userId
        axios.get(`${SERVER_URL}/api/users/${id}`)
          .then (response => {
            dispatch({type: "FETCH_CURRENT_USER_FULFILLED", payload: response.data})
          })
          .catch(err => {
            dispatch({type: "FETCH_CURRENT_USER_REJECTED", payload: err})
          })
      }
    })
  }
}

export const authenticateUser = body => {
  return dispatch => {
    dispatch({type: "AUTHENTICATE USER PENDING"})
    return axios.post("/api/users/auth", {
      email: body.email,
      password: body.password
    })
    .then(response => {
      localStorage.setItem('drafterUserToken', response.data.token.token)
      dispatch({type: "AUTHENTICATE_USER_FULFILLED", payload: response.data})
    })
    .catch(err => {
      dispatch({type: "AUTHENTICATE_USER_REJECTED", payload: err})
    })
  }
}


export const createUser = body => {
  return dispatch => {
    dispatch({type: "CREATE_USER_PENDING"});
    return axios.post("/api/users", {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        registeredAsPlayer: body.registeredAsPlayer,
        position: body.position
      })
      .then(response => {
        dispatch({type: "CREATE_USER_FULFILLED", payload: response.data})
        dispatch({type: "AUTHENTICATE_USER_PENDING"})
        return axios.post("/api/users/auth", {
          email: body.email,
          password: body.password
        })
        .then(response => {
          localStorage.setItem('drafterUserToken', response.data.token.token)
          dispatch({type: "AUTHENTICATE_USER_FULFILLED", payload: response.data})
        })
        .catch(err => {
          dispatch({type: "AUTHENTICATE_USER_REJECTED", payload: err})
        })
      })
      .catch(err => {
        dispatch({type: "CREATE_USER_REJECTED", payload: err})
      })
  }
  
}