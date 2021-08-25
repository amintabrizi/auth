import React, { useState } from 'react';
import { signUp } from './../redux/actions/actions';
import { useDispatch } from 'react-redux';

function SignUp() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp(email, password));
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="form-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off" />
              </div>
              <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
