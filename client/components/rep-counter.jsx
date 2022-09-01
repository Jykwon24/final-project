import React from 'react';

export const RepCounter = props => {

  if (!props.repStatus) return null;

  return (
    <div className='text-white rep-font'>
      Reps:{props.reps}
    </div>
  );
};
