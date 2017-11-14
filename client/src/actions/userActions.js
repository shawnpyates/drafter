import axios from 'axios'

export const createUser = body => {
  console.log("inside create")
  return (dispatch) => {
  // console.log("inside create user with body: ", body)
  // return function(dispatch) {
  //   console.log("inside dispatch")
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
        console.log("SUCCESS: ", response)
        dispatch({type: "CREATE_USER_FULFILLED", payload: response.data})
        return axios.post("/api/users/auth", {
          email: body.email,
          password: body.password
        })
        .then(response => {
          console.log("SUCCESS WITH AUTH: ", response)
        })
        .catch(err => {
          console.log("ERROR WITH AUTH: ", err)
        })
      })
      .catch(err => {
        console.log("ERROR: ", error)
        dispatch({type: "CREATE_USER_REJECTED", payload: err})
      })
  }
  
}