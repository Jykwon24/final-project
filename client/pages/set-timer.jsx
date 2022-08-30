import React, { useState, useRef, useEffect } from 'react';
import { TimeDisplay } from '../components/time-display';

const timeData = {
  workout: 0,
  rest: 0
};

export const Timer = props => {
  const [start, setStart] = useState(false);
  const [displayMin, setDisplayMin] = useState(0);
  const [displaySec, setDisplaySec] = useState(0);
  const [minutes, setMinutes] = useState(timeData);
  const [seconds, setSeconds] = useState(timeData);
  // const [userInput, setUserInput] = useState({});
  const [modalStatus, setModal] = useState(false);
  const [currentStatus, setStatus] = useState('rest');
  // const [reps, setReps] = useState(0);
  // const [delay, setDelay] = useState(1000);

  const modalClick = () => {
    setModal(!modalStatus);
  };
  // console.log('minutes:', minutes);
  // console.log('seconds:', seconds);
  // console.log('displayMin:', displayMin);
  // console.log('displaySec:', displaySec);

  function useInterval(callback, delay) {
    const savedCallBack = useRef();

    useEffect(() => {
      savedCallBack.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallBack.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const timerStart = (event, data) => {
    event.preventDefault();
    setMinutes({ ...timeData, workout: data.workoutMins, rest: data.restMins });
    setSeconds({ ...timeData, workout: data.workoutSec, rest: data.restSec });
    setDisplayMin(data.workoutMins);
    setDisplaySec(data.workoutSec);
  };

  const countDownStart = () => {
    const workoutMinutes = parseInt(minutes.workout);
    const workoutSeconds = parseInt(seconds.workout);
    const restMinutes = parseInt(minutes.rest);
    const restSeconds = parseInt(seconds.rest);

    setDisplaySec(prev => prev - 1);

    if (displayMin === 0 && displaySec === 0) {
      if (currentStatus === 'rest') {
        // console.log('working?');
        setDisplayMin(restMinutes);
        setDisplaySec(restSeconds);
        setStatus('workout');
        // console.log('inside if displayMin:', minute);
        // console.log('inside if displaySec:', second);
        return;
      } else {
        setDisplayMin(workoutMinutes);
        setDisplaySec(workoutSeconds);
        setStatus('rest');
        // setReps(reps + 1);
        return;
      }
    }

    // console.log('inside countdown workout minutes:', workoutMinutes);
    // console.log('inside countdown workout seconds:', workoutSeconds);
    // console.log('inside countdown rest minutes:', restMinutes);
    // console.log('inside countdown rest seconds:', restSeconds);
    // console.log('inside countdown displayMin:', displayMin);
    // console.log('inside countdown displaySec:', typeof displaySec);

    if (displaySec === 0) {
      setDisplaySec(59);
      setDisplayMin(prevMin => prevMin - 1);
    }
  };
  const delay = 1000;
  useInterval(countDownStart, start ? delay : null);

  // const wMinutes = ('0' + Math.floor((wMin / 60000) % 60)).slice(-2);
  // const wSeconds = ('0' + Math.floor((wSec / 1000) % 60)).slice(-2);
  return (
    <>
      <div className='d-flex'>
        <div className='mx-auto'>
          <div className='d-flex'>
            <TimeDisplay minutes={displayMin} seconds={displaySec}/>
          </div>
          <button onClick={() => setModal(!modalStatus)}>Set Timer</button>
          <button onClick={() => setStart(false)}>Pause</button>
          <button onClick={() => setStart(true)}>Start</button>
        </div>

        </div>
          <div className='mx-auto'>
           <a href="#stopwatch">Go to Stopwatch</a>
        </div>
        {
          modalStatus
            ? <SetTimerModal startTimer={timerStart} modalClick={modalClick}/>
            : null
        }

    </>
  );
};

const SetTimerModal = props => {
  const [wMin, setWMin] = useState(0);
  const [wSec, setWSec] = useState(0);
  const [rMin, setRMin] = useState(0);
  const [rSec, setRSec] = useState(0);

  // const input = {
  //   workout: `${wMin}:${wSec}`,
  //   rest: `${rMin}:${rSec}`
  // };

  const input = {
    workoutMins: wMin,
    workoutSec: wSec,
    restMins: rMin,
    restSec: rSec
  };

  return (
    <>
    <div className='modal-container'>
      <form onSubmit={event => props.startTimer(event, input)}>
        <div className='bg-light'>
          <div>
            <h3>Workout Time:</h3>
            <label htmlFor='workout-minutes' className='sr-only'>Mins</label>
              <input
                type='number'
                id='workout-minutes'
                name='workout-minutes'
                placeholder='00'
                min="0"
                max="59"
                onChange={event => {
                  const { value } = event.target;
                  value ? setWMin(value) : setWMin(0);
                }}
                />
                <p className='d-inline'>:</p>
            <label htmlFor='workout-seconds' className='sr-only'>Secs</label>
              <input
                type='number'
                id='workout-seconds'
                name='workout-seconds'
                placeholder='00'
                min="0"
                max="59"
                onChange={event => {
                  const { value } = event.target;
                  value ? setWSec(value) : setWSec(0);
                }}
                 />
          </div>
          <div>
            <h3>Rest Time:</h3>
              <label htmlFor='rest-minutes' className='sr-only'>Mins</label>
                <input
                  type='number'
                  id='rest-minutes'
                  name='rest-minutes'
                  placeholder='00'
                  min="0"
                  max="59"
                  onChange={event => {
                    const { value } = event.target;
                    value ? setRMin(value) : setRMin(0);
                  }}/>
                <p className='d-inline'>:</p>
                <label htmlFor='rest-seconds'className='sr-only'>Secs</label>
                <input
                  type='number'
                  id='rest-seconds'
                  name='rest-seconds'
                  placeholder='00'
                  min="0"
                  max="59"
                  onChange={event => {
                    const { value } = event.target;
                    value ? setRSec(value) : setRSec(0);
                  }} />
          </div>
          <div>
            <p onClick={() => props.modalClick()}>Close</p>
          <button>Start!</button>
          </div>
        </div>
      </form>
    </div>

    </>

  );

};
