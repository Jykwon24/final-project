import React from 'react';

export const TimeDisplay = props => {
  const secondsData = props.currentSeconds;
  const seconds = (secondsData % 60);
  const mins = (secondsData - seconds) / 60;
  const updateSeconds = props.updateSeconds;
  const updateStatus = props.updateStatus;
  const currentStatus = props.currentStatus;

  // console.log(mins, seconds);

  function intervalFn() {
    // console.log(secondsData);

    if (secondsData !== null) {
      // const newSec = secondsData - 1;
      // console.log(newSec);
      updateSeconds(i => {
        if (i !== null) {

          const newSec = i - 1;

          if (newSec === 0) {
            updateStatus(currentStatus === 'workout' ? 'rest' : 'workout');
            // console.log(currentStatus, props.restSeconds, props.workoutSeconds);
            return currentStatus === 'workout' ? props.restSeconds : props.workoutSeconds;
          }
          return newSec;
        }
      });

    }
  }

  return (
    <div>
      <div>
        <h1 className='timer-font'>{(`0${mins}`).slice(-2)}:{(`0${seconds}`).slice(-2)}</h1>
        <button onClick={() => intervalFn()}>Click</button>
      </div>
    </div>
  );
};
