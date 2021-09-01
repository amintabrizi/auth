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

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userID');
  localStorage.removeItem('refresh_token');
  return { type: types.AUTH_LOGOUT }
}

export const checkAuthTimeOut = (refresh_token, expirationTimeOut) => {
  return dispatch => {
    setTimeout(() => {
      /*if you want dony use refresh token */
      //dispatch(logOut());

      /*if you want use refresh token */
      dispatch(handleRefreshToken(refresh_token))
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
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userID', res.data.localId);
        localStorage.setItem('refresh_token', res.data.refreshToken);
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkAuthTimeOut(res.data.refreshToken, res.data.expiresIn));
      })
      .catch(err => {
        //console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error.message))
      })
  }
}

export const handleRefreshToken = (refresh_token) => {
  console.log('handleRefreshToken');
  const authData = {
    "grant_type": "refresh_token",
    "refresh_token": refresh_token,
  }
  return dispatch => {
    axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyDJvGK0bbxNweOmDSGFXvf4pMs8e4rx37g', authData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        //console.log(err.response.data.error.message);
        dispatch(authFail(err.response.data.error.message))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (!token || !refresh_token) {
      dispatch(logOut());
    }
    else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logOut());
      }
      else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeOut(refresh_token, (expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}