import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from './../redux/actions/actions';


function Orders() {

  const token = useSelector((state) => state.auth.token)
  const orders = useSelector((state) => state.ordersReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders(token))
  }, [dispatch, token])

  console.log(orders);

  let orderContent = null;
  if (orders === null) {
    orderContent = <div className="d-flex justify-content-center align-items-center my-5"><p>Loading</p></div>
  } else {
    orderContent = <div className="d-flex justify-content-center align-items-center my-5">
      {
        orders.map(item => <p>customer name : {item.customer.name}</p>)
      }
    </div>
  }

  //let order = { orders.map(order => <p>order</p>) }


  return (
    <div>
      {orderContent}
    </div>
  )
}

export default Orders
