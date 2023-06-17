import React, { useState, useEffect } from 'react';

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  // const [lap, setLap] = useState(false);

  const startTimer = () => {
    setStart(true);
  };

  const stopTimer = () => {
    setStart(false);
  };

  // const showLap = () => {
  //   setLap(true);
  //   setStart(false);
  // };

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  const minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
  const seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
  const milliseconds = ('0' + ((time / 10) % 100)).slice(-2);
  return (
    <>
    <div>
      <div className='d-flex mt-4'>
          <div className='mx-auto stop-watch'>
            <div>
              <h1 className='d-inline-flex text-white'>{minutes}:</h1>
              <h1 className='d-inline-flex text-white'>{seconds}:</h1>
              <h1 className='d-inline-flex text-white'>{milliseconds}</h1>
            </div>
          </div>
      </div>
        <div className='mt-1 d-flex'>
          <div className='mx-auto'>
        {
        start
          ? <>
              <div className='stop-watch-stop' onClick={stopTimer}></div>
              {/* <button onClick={showLap}>Lap</button> */}
            </>
          : <>
              <i className='fa-regular fa-square-caret-right fs-1 stop-watch-start' onClick={startTimer}></i>
              <i className='fa-solid fa-arrow-rotate-left fs-1 ms-2 stop-watch-reset' onClick={() => setTime(0)}></i>
            </>
        }
          </div>
        </div>
        <div className='d-flex mt-4'>
          <div className='mx-auto'>
             <a className='link-style-stopwatch' href="#set-timer">To Set Timer</a>
          </div>
        </div>

    </div>
    </>
  );
};
