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

export const authStart = () => ({
  type: types.AUTH_START,
})

export const authSuccess = (authData) => ({
  type: types.AUTH_SUCCESS,
  authData: authData
})

export const authFail = (error) => ({
  type: types.AUTH_FAIL,
  error: error
})

export const auth = (email, password) => {
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
        console.log(res);
        dispatch(authSuccess(res))
      })
      .catch(err => {
        console.log(err.message);
        dispatch(authFail(err.message))
      })
  }
}