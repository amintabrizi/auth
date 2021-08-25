import React, { useState } from 'react';
import { signIn } from './../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="form-wrapper">
            {
              auth.loading
                ?
                <p>loading</p>
                :
                <>
                  <h2>Sign In</h2>
                  {
                    auth.error
                      ?
                      <div class="alert alert-danger" role="alert">
                        {auth.error}
                      </div>
                      :
                      ''
                  }

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
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
