import React, { useContext } from 'react';
import Redirect from '../components/redirect';
import { AuthForm } from '../components/auth-form';
import { AppContext } from '../app';

export const AuthPage = () => {

  const { user, route, handleSignIn } = useContext(AppContext);

  const welcomeMessage = route.path === 'sign-in'
    ? 'Please sign in!'
    : 'Create an account!';

  // console.log('auth form', user);
  // console.log('inside auth', route);
  if (user) return <Redirect to="" />;

  return (
    <div className='row pt-5 align-items-center'>
      <div className='col-12 col-sm-10 col-md-8 col-xl-4'>
        <header className='text-center'>
          <h3>
            {welcomeMessage}
          </h3>
        </header>
        <div className='card'>
          <AuthForm
            action={route.path}
            onSignIn={handleSignIn}/>
        </div>
      </div>
    </div>
  );
};
