import React from 'react';

export const TimeDisplay = props => {
  return (
    <div>
      <div>
        <h1>{props.minutes}:{props.seconds}</h1>
      </div>
    </div>
  );
};
