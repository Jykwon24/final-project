import React from 'react';

export const AddWorkout = props => {

  return (
      <div className='container'>
        <div>
          <a href='#default-list'>
            <button>
              Add a Default Exercise from List
            </button>
          </a>
        </div>
        <div>
          <a href='#custom-workout'>
            <button>
              Create Your Own Custom Exercise
            </button>
          </a>
        </div>
      </div>
  );
};
