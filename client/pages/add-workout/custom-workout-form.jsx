import React, { useState, useContext } from 'react';
import { AppContext } from '../../app';

export const CustomWorkoutForm = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [details, setDetails] = useState('');

  const { user, day, setUserList, userList, targetExercise, view } = useContext(AppContext);

  const userListCopy = [...userList];

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
      .then(list => [...userListCopy, list])
      .then(result => setUserList(result))
      .catch(err => console.error(err));

    window.location.hash = day;
  };

  // console.log('in workout form:', targetExercise);

  const handleUpdate = event => {
    event.preventDefault();
    const name = workoutName;
    // const userId = user.userId;
    const targetId = targetExercise.exerciseId;
    const targetWorkoutIndex = userListCopy.findIndex(element => element.exerciseId === Number(targetExercise.exerciseId));
    // console.log('index of selected workout:', targetWorkoutIndex);

    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ targetId, name, details })
    };

    if (name && details) {
      req.body = JSON.stringify({ targetId, name, details });
    } else if (name) {
      const details = targetExercise.details;
      req.body = JSON.stringify({ targetId, name, details });
    } else if (details) {
      const name = targetExercise.name;
      req.body = JSON.stringify({ targetId, name, details });
    }

    fetch('/api/userList', req)
      .then(res => {
        if (!res.ok) {
          throw new Error('No network response');
        }
        return res.json();
      })
      .then(result => userListCopy.splice(targetWorkoutIndex, 1, result))
      .then(result => setUserList(userListCopy))
      .catch(err => console.error(err));

    window.location.hash = day;
  };

  // userListCopy[targetWorkoutIndex] = result

  const handleWorkoutName = event => {
    const { value } = event.target;
    setWorkoutName(value);
  };

  const handleDetails = event => {
    const { value } = event.target;
    setDetails(value);
  };

  const alternateActionText = targetExercise.date === null
    ? 'Create your own workout:'
    : 'Edit below:';

  const alternateSubmitAction = view === 'custom'
    ? customSubmit
    : handleUpdate;

  return (
    <>
      <form className='w-100' onSubmit={alternateSubmitAction}>
        <h3>{alternateActionText}</h3>
        <div>
          <input
            required
            autoFocus
            id='workoutName'
            name='workoutName'
            type='text'
            placeholder='Workout Name...'
            className='mb-2'
            defaultValue={targetExercise.name}
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
            defaultValue={targetExercise.details}
            onChange={handleDetails}>
          </textarea>
        </div>
        <div>
         {
          view === 'custom'
            ? <button type='submit'>Add workout</button>
            : <>
                <button type='submit'> Update workout </button>
                <button> Back </button>
            </>
            }
        </div>
      </form>
    </>
  );
};
