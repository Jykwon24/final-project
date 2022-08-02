import React, { useState } from 'react';

export const AuthForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const { action } = props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };
    // console.log(req.body);

    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          props.onSignIn(result);
        }
      });
  };

  const handleUser = event => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePassword = event => {
    const { value } = event.target;
    setPassword(value);
  };

  const { action } = props;
  const alternateActionHref = action === 'sign-up'
    ? '#sign-in'
    : '#sign-up';
  const alternateActionText = action === 'sign-up' || ''
    ? 'Already have an account?'
    : 'Please create an account!';
  const submitButtonText = action === 'sign-up'
    ? 'Register'
    : 'Log In';

  return (
    <>
      <form className='w-100' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>
            Username:
          </label>
          <input
            required
            autoFocus
            id='username'
            type='text'
            name='username'
            onChange={handleUser}/>
        </div>
        <div>
          <label htmlFor='password'>
            Password:
          </label>
          <input
            required
            type='password'
            id='password'
            name='password'
            onChange={handlePassword}/>
        </div>
        <div>
          <button type='submit'>{submitButtonText}</button>
          <a href={alternateActionHref}>{alternateActionText}</a>
        </div>
      </form>
    </>
  );
};
