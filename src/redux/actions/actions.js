import * as types from './../types/types';
import axios from 'axios';
//receive data for pagination
// export const getjobsAction = () => (dispatch) => {
//   setTimeout(() => {
//     axios.get(`/jobs`)
//       .then(response => {

//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }, 1000);
// }

export const increment = () => ({
  type: types.ADD_COUNT,
})

export const setOrders = (data) => ({
  type: types.SET_ORDERS,
  data: data
})

export const getOrders = (token) => (dispatch) => {
  setTimeout(() => {
    axios.get(`https://burger-84d80-default-rtdb.firebaseio.com/orders.json?auth=` + token)
      .then(response => {
        dispatch(setOrders(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }, 1000);
}

export const authStart = () => ({
  type: types.AUTH_START,
})

export const authSuccess = (token, userID) => ({
  type: types.AUTH_SUCCESS,
  token: token,
  userID: userID
})

export const authFail = (error) => ({
  type: types.AUTH_FAIL,
  error: error
})

export const logOut = () => ({
  type: types.AUTH_LOGOUT,
})

export const checkAuthTimeOut = (expirationTimeOut) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTimeOut * 1000);
  }
}

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJvGK0bbxNweOmDSGFXvf4pMs8e4rx37g', authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res))
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err))
      })
  }
}

export const signIn = (email, password) => {

  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJvGK0bbxNweOmDSGFXvf4pMs8e4rx37g', authData)
      .then(res => {
        //console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch(err => {
        //console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error.message))
      })
  }
}