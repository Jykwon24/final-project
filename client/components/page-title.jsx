import React, { useContext } from 'react';
import { AppContext } from '../app';

export const PageTitle = () => {

  const { user } = useContext(AppContext);

  const hashRoute = window.location.hash;

  if (!user) {
    return null;
  } else if (hashRoute === '#stopwatch') {
    return (
            <div className='dg-background d-flex justify-content-center align-items-center text-white page-style'>
              <p className='mt-2 mb-2'>Timers:</p>
            </div>
    );
  } else if (hashRoute === '#calories' || hashRoute === '#calories-result') {
    return (
            <div className='dg-background d-flex justify-content-center align-items-center text-white page-style'>
              <p className='mt-2 mb-2'>Calories:</p>
            </div>
    );
  } else if (hashRoute === '#default-list') {
    return (
            <div className='dg-background d-flex justify-content-center align-items-center text-white page-style'>
              <p className='mt-2 mb-2'>Add workout from provided list below:</p>
            </div>
    );
  } else if (hashRoute === '#custom-workout') {
    return (
      <div className='dg-background d-flex justify-content-center align-items-center text-white page-style'>
        <p className='mt-2 mb-2'>Create a custom workout to add:</p>
      </div>
    );
  } else {
    return (
            <div className='dg-background d-flex justify-content-around align-items-center text-white page-style'>
              <p className='mt-2 mb-2'>Exercise:</p>
              <p className='mt-2 mb-2'>Sets/Reps:</p>
            </div>
    );
  }
};
