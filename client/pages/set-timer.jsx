import React, { useState, useRef, useEffect } from 'react';
import { TimeDisplay } from '../components/time-display';
import { RepCounter } from '../components/rep-counter';
import { TimerControls } from '../components/timer-controls';

const timeData = {
  workout: 0,
  rest: 0
};

export const Timer = props => {
  const [start, setStart] = useState(false);
  const [displayMin, setDisplayMin] = useState(0);
  const [displaySec, setDisplaySec] = useState(0);
  const [reps, setReps] = useState(0);
  const [minutes, setMinutes] = useState(timeData);
  const [seconds, setSeconds] = useState(timeData);
  const [modalStatus, setModal] = useState(false);
  const [repView, setRepView] = useState(false);
  const [currentStatus, setStatus] = useState('rest');
  const [paused, setPause] = useState(false);
  const [timerActive, setTimerStatus] = useState(false);

  const modalClick = () => {
    setModal(!modalStatus);
  };

  // Custom Interval hook from Dan Abramov blog
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
    setRepView(true);
    setStart(true);
    setTimerStatus(true);
    setModal(false);
  };

  const countDownStart = () => {
    const workoutMinutes = parseInt(minutes.workout);
    const workoutSeconds = parseInt(seconds.workout);
    const restMinutes = parseInt(minutes.rest);
    const restSeconds = parseInt(seconds.rest);

    setDisplaySec(prev => prev - 1);

    if (displayMin === 0 && displaySec === 0) {
      if (currentStatus === 'rest') {
        setDisplayMin(restMinutes);
        setDisplaySec(restSeconds);
        setStatus('workout');
        return;
      } else {
        setDisplayMin(workoutMinutes);
        setDisplaySec(workoutSeconds);
        setStatus('rest');
        setReps(reps + 1);
        return;
      }
    }

    if (displaySec === 0) {
      setDisplaySec(59);
      setDisplayMin(prevMin => prevMin - 1);
    }
  };

  const countDownPause = () => {
    setStart(false);
    setPause(true);
  };

  const resumeCountDown = () => {
    setStart(true);
    setPause(false);
  };

  const resetCountDown = () => {
    setDisplayMin(0);
    setDisplaySec(0);
    setStart(false);
    setPause(false);
    setReps(0);
    setRepView(false);
    setTimerStatus(false);
  };

  const delay = 1000;
  useInterval(countDownStart, start ? delay : null);

  const currentSetText = currentStatus === 'rest'
    ? 'Workout!'
    : 'Rest';

  return (
    <>
      <div>
        <div>
            <h2 className='timer-text text-center'>{timerActive ? currentSetText : null}</h2>
          <div className='timer-container dg-background'>
            <div>
              <TimeDisplay minutes={displayMin} seconds={displaySec}/>
            </div>
            <div>
              <RepCounter reps={reps} repStatus={repView} />
            </div>
            <div>
              {
                timerActive
                  ? <TimerControls pauseStatus={paused} pause={countDownPause} resume={resumeCountDown} reset={resetCountDown}/>
                  : <button className='button-style' onClick={() => setModal(!modalStatus)}>Set Timer</button>
              }
            </div>
            <div className='mt-3 text-center'>
              <a className='link-style' href="#stopwatch">Go to Stopwatch</a>
            </div>
          </div>
        </div>
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

  const input = {
    workoutMins: wMin,
    workoutSec: wSec,
    restMins: rMin,
    restSec: rSec
  };

  return (
    <>
    <div className='modal-container'>
      <div className='modal-content-container'>
        <form onSubmit={event => props.startTimer(event, input)} className='form-box'>
          <div className='bg-light form-content-container'>
              <span className='x-box position-absolute end-0' onClick={() => props.modalClick()}>X</span>
            <div className='form-content-container'>
              <h3>Workout Time:</h3>
              <label htmlFor='workout-minutes' className='sr-only'>Mins</label>
                <div>
                <input
                  type='number'
                  id='workout-minutes'
                  name='workout-minutes'
                  placeholder='00'
                  min='0'
                  max='59'
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
                  min='0'
                  max='59'
                  onChange={event => {
                    const { value } = event.target;
                    value ? setWSec(value) : setWSec(0);
                  }}
                  />
                </div>
            </div>
            <div className='form-content-container'>
              <h3>Rest Time:</h3>
                <label htmlFor='rest-minutes' className='sr-only'>Mins</label>
                <div>
                  <input
                    type='number'
                    id='rest-minutes'
                    name='rest-minutes'
                    placeholder='00'
                    min='0'
                    max='59'
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
                    min='0'
                    max='59'
                    onChange={event => {
                      const { value } = event.target;
                      value ? setRSec(value) : setRSec(0);
                    }} />
                </div>
            </div>
            <div className='mt-2 mb-2'>
              <button>Start!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
