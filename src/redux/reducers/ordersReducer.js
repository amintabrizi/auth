import * as Types from './../types/types';

const initialState = null;

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ORDERS:
      let data = [];
      for (var key in action.data) {
        data.push(action.data[key]);
      }
      console.log(data);
      return [...data];

    default:
      return state;
  }
}

export default ordersReducer;