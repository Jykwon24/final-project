import React from 'react';

const styles = {
  page: {
    minHeight: 'calc(75vh - 3.5rem)'
  }
};

export default function PageView({ children }) {
  return (
    <>
    <div>
        <div className='dg-background d-flex justify-content-around align-items-center text-white page-style'>
          <p className='mt-2 mb-2'>Exercises:</p>
          <p className='mt-2 mb-2'>Sets/Reps:</p>
        </div>
        <div className='container mt-2' style={styles.page}>
          <div className='row'>
            <ul className='col ms-4'>exercise list</ul>
            <ul className='col text-center'>set/reps list</ul>
          </div>
        </div>
    </div>
    </>
  );
}
