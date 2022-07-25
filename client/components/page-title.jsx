import React from 'react';

export const PageTitle = () => {

  const hashRoute = window.location.hash;

  if (hashRoute === '#stopwatch') {
    return (
            <div className='dg-background d-flex justify-content-center align-items-center text-white page-style'>
              <p className='mt-2 mb-2'>Stopwatch:</p>
            </div>
    );
  } else if (hashRoute === '#calories') {
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
