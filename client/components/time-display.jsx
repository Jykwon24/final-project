import React, { useState, useEffect } from 'react';

export const TimeDisplay = props => {
  const styles = {
    page: {
      minWidth: '198px'
    },
    center: {
      marginLeft: '8px'
    }
  };

  // const [currentSeconds, setCurrent] = useState(0);
  const { current } = props;
  // const [currentTime, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(0);

  useEffect(() => {
    // setCurrent(current);
    setSeconds(current % 60);
    setMins(Math.floor(current / 60));
  }, [current]);

  return (
    <div>
      <div>
        <h1 className='timer-font timer-box' style={styles.page}>
          <div style={styles.center}>
           <span>{(`0${mins}`).slice(-2)}:</span>
           <span>{(`0${seconds}`).slice(-2)}</span>
          </div>
        </h1>
      </div>
    </div>
  );
};
