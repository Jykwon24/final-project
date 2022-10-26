import React, { useContext } from 'react';
import Redirect from '../components/redirect';
import { AuthForm } from '../components/auth-form';
import { AppContext } from '../app';

export const AuthPage = () => {

  const { user, route, handleSignIn } = useContext(AppContext);

  const myStyles = {
    backgroundImage: 'url(/img/Gym-Background.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    bottom: 0,
    top: 50,
    left: 0,
    right: 0,
    zIndex: -1
  };

  const welcomeMessage = route.path === 'sign-in'
    ? 'Please sign in!'
    : 'Create an account!';

  // console.log('auth form', user);
  // console.log('inside auth', route);
  if (user) return <Redirect to="" />;

  return (
    <div className='row pt-5 align-items-center auth-form-center' >
      <div style={myStyles}></div>
      <div className='col-12 col-sm-10 col-md-8 col-xl-6 auth-form-center'>
        <header className='text-center'>
          <h3>
            {welcomeMessage}
          </h3>
        </header>
        <div className='card auth-form-style'>
          <AuthForm
            action={route.path}
            onSignIn={handleSignIn}/>
        </div>
      </div>
    </div>
  );
};
