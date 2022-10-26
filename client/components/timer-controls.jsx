import React from 'react';

export const TimerControls = props => {

  if (!props.pauseStatus) {
    return (
          <div className='mt-2'>
            <i className='fa-solid fa-circle-pause fs-3 text-white'
               onClick={props.pause}></i>
            <i className='fa-solid fa-arrow-rotate-left fs-3 ms-2 text-white'
               onClick={props.reset}></i>
          </div>
    );
  } else {
    return (
          <div className='mt-2'>
            <i className='fa-solid fa-circle-play fs-3 text-white'
               onClick={props.resume}></i>
            <i className='fa-solid fa-arrow-rotate-left fs-3 ms-2 text-white'
               onClick={props.reset}></i>
          </div>
    );
  }
};
