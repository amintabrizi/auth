import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './../redux/actions/actions';

function Home() {

  const count = useSelector((state) => state.countReducer);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card my-4 w-50">
          <h5 className="card-header">Counter</h5>
          <div className="card-body">
            <p className="card-text">Counter is: {count}</p>
            <button onClick={() => dispatch(increment())} className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
