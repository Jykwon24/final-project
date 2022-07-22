import React, { useState } from 'react';
import { CustomWorkoutForm } from './custom-workout-form';

export const AddWorkout = () => {
  const [view, setView] = useState('select');

  if (view === 'select') {
    return (
      <div className='container'>
        <div>
          <button onClick={() => setView('default-list')}>
            Add a Default Exercise from List
          </button>
        </div>
        <div>
          <button onClick={() => setView('custom-workout')}>
            Create Your Own Custom Exercise
          </button>
        </div>
      </div>
    );
  }

  if (view === 'custom-workout') {
    return (
      <CustomWorkoutForm />
    );
  }

};
