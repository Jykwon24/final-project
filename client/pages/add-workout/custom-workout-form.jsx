import React from 'react';

export const CustomWorkoutForm = () => {
  return (
    <div>
      <h2>Create your own:</h2>
      <form>
        <div>
          <input type='text' placeholder='Workout Name...'/>
        </div>
        <div>
          <input type='text' placeholder='Workout details, instructions, anything you
            want to put regarding the workout!...'/>
        </div>
        <div>
          <a href='#workouts'>
          <button>
            back
          </button>
          </a>
          <button>
            add
          </button>
        </div>
      </form>
    </div>
  );
};
