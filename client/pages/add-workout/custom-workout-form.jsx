import React, { useState, useContext } from 'react';
import { AppContext } from '../../app';

export const CustomWorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [details, setDetails] = useState('');

  const { user, day } = useContext(AppContext);

  // console.log(user.userId);

  const customSubmit = event => {
    event.preventDefault();
    const selectedDay = day;
    const name = workoutName;
    const userId = user.userId;

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, selectedDay, name, details })
    };

    fetch('/api/userList', req)
      .then(res => {
        if (!res.ok) {
          throw new Error('No network response');
        }
        return res.json();
      })
      .catch(err => console.error(err));
  };

  const handleWorkoutName = event => {
    const { value } = event.target;
    setWorkoutName(value);
  };

  const handleDetails = event => {
    const { value } = event.target;
    setDetails(value);
  };

  // const handleBack = () => {

  // };

  return (
    <>
      <form className='w-100' onSubmit={customSubmit}>
        <h3>Create your own:</h3>
        <div>
          <input
            required
            autoFocus
            id='workoutName'
            name='workoutName'
            type='text'
            placeholder='Workout Name...'
            className='mb-2'
            onChange={handleWorkoutName}/>
        </div>
        <div className='h-100'>
          <textarea
            required
            id='details'
            name='details'
            type='text'
            placeholder='Workout details, instructions, anything you
            want to put regarding the workout!...'
            className='w-100 mh-75'
            onChange={handleDetails}>
          </textarea>
        </div>
        <div>
          <a href='#workouts'>
          <button>
            back
          </button>
          </a>
          <button type='submit'>
            add
          </button>
        </div>
      </form>
    </>
  );
};
