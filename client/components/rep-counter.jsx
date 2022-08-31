import React from 'react';

export const RepCounter = props => {

  if (!props.repStatus) return null;

  return (
    <div>
      Reps:{props.reps}
    </div>
  );
};
