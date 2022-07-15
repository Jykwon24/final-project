import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(80vh - 3.5rem)'
  }
};

export default function PageView({ children }) {
  return (
    <>
      <div className='dg-background d-flex justify-content-around text-white align-content-center week-style'>
        <h6>Exercises:</h6>
        <h6>Sets/Reps:</h6>
      </div>
      <div style={styles.page}>
        <div>
          <h1>exercise list</h1>
        </div>
      </div>
    </>
  );
}
