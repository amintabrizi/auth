import * as Types from './../types/types';

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
};

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTH_START:
      return {
        ...state, error: null, loading: true
      }
    case Types.AUTH_SUCCESS:
      return {
        ...state, token: action.token, userID: action.userID, error: null, loading: false
      }
    case Types.AUTH_FAIL:
      return {
        ...state, error: action.error, loading: false
      }
    case Types.AUTH_LOGOUT:
      return {
        ...state, token: null, userID: null
      }
    default:
      return state;
  }
}

export default countReducer;