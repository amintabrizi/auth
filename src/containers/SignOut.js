import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from './../redux/actions/actions';

function SignOut() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut())
  }, [dispatch])

  return (
    <Redirect to="/" />
  )
}

export default SignOut
