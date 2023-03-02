import React, { useState, useContext } from 'react';
import { AppContext } from '../../app';
import Button from 'react-bootstrap/Button';

export const CustomWorkoutForm = () => {
  const { user, day, setUserList, userList, targetExercise, view, setDay } = useContext(AppContext);

  const [workoutName, setWorkoutName] = useState(targetExercise.name);
  const [details, setDetails] = useState(targetExercise.details);

  // console.log('targetExercise:', targetExercise);
  // console.log('view:', view);

  const userListCopy = userList;
  // console.log('workoutName:', workoutName);
  // console.log('details:', details);

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
  // console.log('in workout form, userlist:', userListCopy);

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
    <div className='custom-form-container'>
      <form className='custom-form-content' onSubmit={alternateSubmitAction}>
        <h3>{alternateActionText}</h3>
        <div>
          <input
            required
            autoFocus
            id='workoutName'
            name='workoutName'
            type='text'
            placeholder='Workout Name...'
            className='mb-2 input-sizing'
            defaultValue={targetExercise.name}
            onChange={handleWorkoutName}/>
        </div>
        <div>
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
            ? <div className='calorie-button'>
                <Button className='logo-header' type='submit' variant="light">
                  Submit
                </Button>
              </div>
            : <>
                <button type='submit' onClick={setDay(day)}> Update workout </button>
                <button type='button'> Back </button>
            </>
            }
        </div>
      </form>
    </div>
    </>
  );
};
