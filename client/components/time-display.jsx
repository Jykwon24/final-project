import React from 'react';

export const TimeDisplay = props => {
  return (
    <div>
      <div>
        <h1>{('0' + props.minutes).slice(-2)}:{('0' + props.seconds).slice(-2)}</h1>
      </div>
    </div>
  );
};
