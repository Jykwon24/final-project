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

      <div className='d-flex justify-content-center mx-auto'>
        <div className='d-flex'>
          <h1>{minutes}:</h1>
          <h1>{seconds}:</h1>
          <h1>{milliseconds}</h1>
          {/* {
        lap
          ? <p>{`${minutes}:${seconds}:${milliseconds}`}</p>
          : null
          } */}
        </div>
      </div>

      <div className='d-flex justify-content-center'>
        {
        start
          ? <>
              <button onClick={stopTimer}>Stop</button>
              {/* <button onClick={showLap}>Lap</button> */}
            </>
          : <>
              <button onClick={startTimer}>Start</button>
              <button onClick={() => setTime(0)}>Reset</button>
            </>
      }
      </div>
    </div>
    </>
  );
};
