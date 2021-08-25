import * as Types from './../types/types';

const initialState = 0;

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_COUNT:
      return state + 1;

    default:
      return state;
  }
}

export default countReducer;