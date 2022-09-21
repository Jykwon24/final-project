import React from 'react';

export const TimeDisplay = props => {

  const secondsData = props.data.currentSeconds;
  const seconds = (secondsData % 60);
  const mins = (secondsData - seconds) / 60;
  // const updateSeconds = props.updateSeconds;
  // const updateStatus = props.updateStatus;
  // const currentStatus = props.currentStatus;

  // console.log('minutes after calc:', mins, 'seconds after calc:', seconds);
  // console.log('props.timeData object:', props.data);

  // function intervalFn() {

  //   console.log(secondsData.currentSeconds);

  // if (secondsData.currentSeconds !== null) {
  // const newSec = currentSeconds - 1;
  // console.log(newSec);
  // secondsData.currentSeconds--;

  // setCurrentSeconds(i => {
  //   if (i !== null) {

  //     const newSec = i - 1;

  //     if (newSec === 0) {
  //       setCurrentStatus(currentStatus === 'workout' ? 'rest' : 'workout');
  //       console.log(currentStatus, restSeconds, workoutSeconds);
  //       return currentStatus === 'workout' ? restSeconds : workoutSeconds;
  //     }
  //     return newSec;
  //   }
  // });

  //   }
  // }

  return (
    <div>
      <div>
        <h1 className='timer-font'>{(`0${mins}`).slice(-2)}:{(`0${seconds}`).slice(-2)}</h1>
        {/* <button onClick={() => setInterval(intervalFn, 1000)}>Click</button> */}
        {/* <button onClick={() => intervalFn()}>Click</button> */}
      </div>
    </div>
  );
};
